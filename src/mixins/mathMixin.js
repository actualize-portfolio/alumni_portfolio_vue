const mathMixix = {
  methods: {
    $_mathMixin_mode(array) {
      if(array.length < 1) {
        return '';
      }
      const counts = {}

      array.forEach(element => {
        if(counts[element] === undefined) {
          counts[element] = 0
        }
        counts[element] += 1
      });

      return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    },
  },
};

export default mathMixix;
