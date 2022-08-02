<template>
  <div class="row">
    <div class="input-group">
      <div>
        <button
          class="btn btn-outline-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ inputUnit }}
        </button>
        <ul class="dropdown-menu">
          <div v-for="(units, category) in unitCategories" :key="`input-${category}`">
            <li class="dropdown-category">
              {{ category }}
              <hr class="dropdown-divider" />
            </li>
            <li
              v-for="(_, unit) in units"
              :key="`input-${unit}`"
              class="dropdown-item"
              @click="changeInputUnitAndCategory(unit, category)"
            >
              {{ unit }}
            </li>
          </div>
        </ul>
      </div>

      <input type="number" step="any" v-model="input" class="form-control input-units" aria-label="input" />

      <div>
        <button
          class="btn btn-outline-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ outputUnit }}
        </button>
        <ul class="dropdown-menu">
          <li
            v-for="(_, unit) in filteredUnitCategory"
            :key="`output-${unit}`"
            class="dropdown-item"
            @click="changeOutputUnit(unit)"
          >
            {{ unit }}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="row result">
    <h3>{{ result }}</h3>
  </div>
</template>
<script>
import textMixin from "@/mixins/textMixin";
import conversionMixin from "@/mixins/conversionMixin";

export default {
  name: "ConversionWidget",
  mixins: [conversionMixin, textMixin],
  methods: {
    changeInputUnitAndCategory(unit, category) {
      this.inputUnit = unit;

      if (this.category !== category) {
        this.changeOutputUnit(unit);
        this.category = category;
      }
    },
    changeOutputUnit(unit) {
      this.outputUnit = unit;
    },
    inputUnits() {
      return this.unitCategories[this.category][this.inputUnit];
    },
    outputUnits() {
      return this.unitCategories[this.category][this.outputUnit];
    },
  },
  computed: {
    filteredUnitCategory() {
      return this.unitCategories[this.category] || {};
    },
    result() {
      const result = this.input / (this.inputUnits() / this.outputUnits());
      const inputUnit = this.$_textMixin_maybeSingularize(this.input, this.inputUnit);
      const outputUnit = this.$_textMixin_maybeSingularize(result, this.outputUnit);

      return `${this.input || 0} ${inputUnit} = ${result} ${outputUnit}`;
    },
  },
  data() {
    return {
      input: 1,
      inputUnit: "inches",
      category: "length",
      outputUnit: "inches",
    };
  },
};
</script>
<style scoped>
.dropdown-category {
  padding-left: 5px;
  padding-top: 10px;
  font-weight: bold;
}
.input-units {
  text-align: center;
}
.result {
  margin-top: 20px;
  text-align: center;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
