const textMixin = {
  methods: {
    $_textMixin_capitalizeWord(word) {
      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    },
  },
};

export default textMixin;
