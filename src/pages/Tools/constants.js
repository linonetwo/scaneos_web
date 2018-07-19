export const formItemFieldConfig = name => ({
  rules: [
    {
      required: true,
      whitespace: true,
    },
  ],
  initialValue: name,
});
