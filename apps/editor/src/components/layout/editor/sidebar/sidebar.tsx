"use client";
import type { Category } from "@/statics/items";

import { categories, categoryDict } from "@/statics/items";
import { ChevronLeft } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from 'react';


const Sidebar = () => {
  const [tabKey, setTabKey] = useState<Category>('');
  const [formKey, setFormKey] = useState<string>('');

  return (
    <>
      <nav className="sticky top-14 rounded bg-amber-300 w-12 h-[calc(100vh-60px)]">
        {categories.map((category) => (
          <IconButton key={category.key} onClick={() => { setTabKey(category.key) }}>
            {category.icon}
          </IconButton>
        ))}
      </nav>

      <div className={tabKey !== "" ? 'w-64' : 'w-0'}>
        {tabKey !== "" ? formKey !== '' ? (
          <>
            <div>
              <IconButton onClick={() => {setFormKey('')}}>
                <ChevronLeft />
              </IconButton>
            </div>
            {categoryDict[tabKey].render(formKey as never)} 
          </>
        ) : (
          <div className="w-64">
            <ul className='flex flex-col gap-2'>
              {categoryDict[tabKey].options.map((item) => (
                <li className='border rounded' key={item.name}>
                  <button
                      className="cursor-pointer p-2 w-full h-full inline-block text-start"
                      onClick={() => {
                        setFormKey(item.name);
                      }}
                    >
                    {item.name.replaceAll('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div >
    </>
  );
};

export { Sidebar };
