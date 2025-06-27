import type { DependsOnBase, FormBuilderConfig, GetInputsImpl, InputArray, VisibilityDependency } from "@mfb/core";
import type { FieldValues } from 'react-hook-form';

import { conditionArrayCalculator, mergeName } from '@mfb/core';
import { set } from 'react-hook-form';

import type { Config } from './index';

const isKey = (value: string) => /^\w*$/.test(value);
const compact = <TValue>(value: TValue[]) =>
  Array.isArray(value) ? value.filter(Boolean) : [];
const stringToPath = (input: string): string[] =>
  compact(input.replace(/["|']|\]/g, '').split(/\.|\[/))
const isNullOrUndefined = (value: unknown): value is null | undefined => value == null;

interface TestForm {
  a: string;
  b: string;
  c: {
    d: string;
    e: {
      f: number;
      g: string;
      h: boolean;
    }
  };
}

const testItems: InputArray<Config, TestForm> = [
  {
    name: 'a',
    props: {},
    type: 'text',
  },
  {
    name: 'b',
    props: {},
    type: 'text',
  },
  {
    name: "c.d",
    props: {},
    type: 'text',
  },
  {
    dependsOn: {
      condition: 'eq',
      id: 'c.e.g',
      path: 'c.e.g',
      type: 'visibility',
      value: 'show',
    },
    name: 'c.e.f',
    props: {},
    type: 'text',
  },
  {
    dependsOn: {
      condition: 'eq',
      id: 'c.e.h',
      path: 'c.e.h',
      type: 'visibility',
      value: '1',
    },
    name: 'c.e.g',
    props: {},
    type: 'text',
  },
  {
    name: 'c.e.h',
    props: {},
    type: 'text',
  }
];

function getDefaultValues<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues
>(
  config: TConfig,
  list: InputArray<TConfig, TFields>,
  prefix?: string
): unknown {
  let result = {};

  const dequeue: Array<GetInputsImpl<TConfig, TFields>> = [];

  const visited = new Set<string>();

  list.forEach((item) => {
    const resolvedItem = typeof item === 'function' ? item() : item;

    if ('dependsOn' in resolvedItem && resolvedItem.dependsOn) {
      dequeue.push(resolvedItem);
    } else {
      const value = config.input.defaultValues[resolvedItem.type];
      const name = mergeName(prefix || '', resolvedItem.name)
      visited.add(name);

      if (typeof value !== 'undefined') {
        set(result, name, value) as never;
      }
    }
  });

  while (dequeue.length > 0) {
    for (let i = 0, len = dequeue.length; i < len; i++) {
      const item = dequeue.shift();
      if (!item) continue;

      let flag = false;

      const deps = (Array.isArray(item.dependsOn) ? item.dependsOn : [item.dependsOn])
        .reduce<Array<DependsOnBase<TFields> & VisibilityDependency & { current: unknown }>>((acc, cur) => {
          if (cur && cur.type === 'visibility') {
            // const currentValue = get(result, cur?.path);
            const currentValue = (isKey(cur.path) ? [cur.path] : stringToPath(cur.path)).reduce(
              (result, key) => {
                if (isNullOrUndefined(result))
                  return result;

                if (key in result) {
                  return result[key as keyof {}];
                } else {
                  if(!visited.has(cur.path))
                    flag = true;
                  return result;
                }
              },
              result,
            )
            acc.push({ ...cur, current: currentValue });
          }
          return acc
        }, []);

      if (!deps) continue;
      if (flag) {
        dequeue.push(item);
        continue;
      };

      const name = mergeName(prefix || '', item.name);
      visited.add(name);
      if (conditionArrayCalculator(deps)) {
        let value: unknown;
        if ('props' in item && 'deafultValue' in item.props) {
          value = item.props.defaultValue;
        } else {
          value = config.input.defaultValues[item.type];
        }

        set(result, name, value);
      }
    }
  }

  return result;
}

export { getDefaultValues, testItems, };
