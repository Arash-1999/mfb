---
id: introduction
sidebar_position: 0
---

# Introduction

Mfb is a declarative framewrok for efficiently building forms.

## Why do we need such a framework?

Writing HTML templates and javascript for data-entry by hand is hard, especially in applications of reasonable size. Furthermore, a form is often more than just a collection of input fields and more advanced functionlaity is required, e.g. validation or making fields depend on each other for conditional rendering and data binding.

## Architecture

The basis of Mfb is [react hook form](https://react-hook-form.com) which is library for building performant, flexible and extensible forms with easy-to-use validation.

We provide core functionlaity for building forms without any built-in ui components or schema validation library, you could use your desired library or provided plugins. see [plugins](/docs/plugins).

## Something missing?

If you find issues with the documentation or have suggestions on how to improve the documentation or the project in general, please [file an issue](https://github.com/arash-1999/mfb/issues/new) for us.
