const textMixin = {
  methods: {
    $_textMixin_capitalizeWord(word) {
      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    },
    $_textMixin_formatNumber(integer) {
      return integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};

export default textMixin;
