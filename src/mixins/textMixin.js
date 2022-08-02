import { singular } from "pluralize";

const textMixin = {
  methods: {
    $_textMixin_capitalizeWord(word) {
      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    },
    $_textMixin_formatNumber(integer) {
      return integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    $_textMixin_maybeSingularize(count, word) {
      return count == 1 ? singular(word) : word;
    },
  },
};

export default textMixin;
