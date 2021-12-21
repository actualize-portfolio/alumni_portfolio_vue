import { mount } from "@vue/test-utils";
import RepoTrackerTable from "@/components/RepoTrackerTable.vue";

describe("RepoTrackerTable", () => {
  let wrapper;
  let columns;

  const props = {
    repos: [],
  };

  beforeEach(() => {
    wrapper = undefined;
    wrapper = mount(RepoTrackerTable, { props });
    columns = wrapper.findAll("td");
  });

  xit("renders the isFavorite column", () => {
    expect(columns[0].find("i").classes()).toEqual([
      "fas",
      "fa-star",
      "unchecked",
    ]);
  });
});
