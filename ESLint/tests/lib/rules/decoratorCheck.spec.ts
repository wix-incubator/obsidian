const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/decoratorCheck");
const { config } = require('../../eslintOptions');

const ruleTester = new RuleTester(
  // {
  // parserOptions,
  // parser: "@typescript-eslint/parser",
  // }
config);

ruleTester.run("decoratorCheck", rule, {
  valid: [
    // {
    //   code: `
    //     class MyClass {
    //       @myDecorator
    //       public myMethod() {}
    //     }
    //   `,
    // },
    // {
    //   code: `
    //     class MyClass {
    //       @myDecorator
    //       get myProp() { return this._myProp; }
    //       set myProp(value) { this._myProp = value; }
    //     }
    //   `,
    // },
    {
      code: `
        @myDecorator
        class MyClass {
          public myProp = 123;
        }
      `,
    },
  ],

  invalid: [
    // {
    //   code: `
    //     class MyClass {
    //       @myDecorator
    //        public myMethod() {}
    //     }
    //   `,
    //   errors: [
    //     {
    //       message: "Unexpected space before decorator.",
    //       line: 3,
    //       column: 12,
    //     },
    //   ],
    // },
    {
      code: `
        class MyClass {
          @myDecorator
          public myMethod() {}
           @anotherDecorator
           public myOtherMethod() {}
        }
      `,
      errors: [
        {
          message: "Unexpected space after decorator.",
          line: 5,
          column: 13,
        },
      ],
    },
  ],
});
