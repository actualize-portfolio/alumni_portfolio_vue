import { mount } from "@vue/test-utils";
import RepoTrackerTable from "@/components/RepoTrackerTable.vue";

describe("RepoTrackerTable", () => {
  let wrapper;
  let rows;
  let headers;
  let row1;
  let row2;

  const props = {
    repos: [
      {
        id: 1,
        name: "vue",
        full_name: "vuejs/vue",
        category: "javascript_framework",
        forks_count: 31000,
        watchers_count: 191658,
        popularity_rating: 178503,
      },
      {
        id: 2,
        name: "react",
        full_name: "facebook/react",
        category: "javascript_framework",
        forks_count: 36466,
        watchers_count: 179702,
        popularity_rating: 170327,
      },
    ],
  };

  beforeEach(() => {
    wrapper = undefined;
    wrapper = mount(RepoTrackerTable, { props });
    rows = wrapper.findAll("tr");
    headers = rows[0].findAll("th");
    row1 = rows[1].findAll("td");
    row2 = rows[2].findAll("td");
  });

  it("renders the headers", () => {
    expect(headers[0].text()).toContain("Project");
    expect(headers[1].text()).toContain("Forks");
    expect(headers[2].text()).toContain("Watchers");
    expect(headers[3].text()).toContain("Popularity");
  });

  it("renders the first row", () => {
    expect(row1[0].text()).toContain("vue");
    expect(row1[1].text()).toContain("31,000");
    expect(row1[2].text()).toContain("191,658");
    expect(row1[3].text()).toContain("178,503");
  });

  it("renders the second row", () => {
    expect(row2[0].text()).toContain("react");
    expect(row2[1].text()).toContain("36,466");
    expect(row2[2].text()).toContain("179,702");
    expect(row2[3].text()).toContain("170,327");
  });
});
