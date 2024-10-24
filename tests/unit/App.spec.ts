import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// ルーティングのモックを作成
const routes: RouteRecordRaw[] = [
  {
    path: "/mock",
    component: {
      template: "<div>Mock Component</div>",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe("App.vue", () => {
  it("renders GlobalHeader and router-view", async () => {
    // ルーターを使ってコンポーネントをマウント
    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    await router.isReady();
    expect(wrapper.findComponent({ name: "GlobalHeader" }).exists()).toBe(true);
    expect(wrapper.html()).not.toContain("Mock Component");
    await router.push("/mock");
    expect(wrapper.html()).toContain("Mock Component");
  });
});
