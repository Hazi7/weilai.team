import SubNav from "@/components/layouts/SubNav.vue";
import TopNav from "@/components/layouts/TopNav.vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...routes,
        {
            path: "/community",
            name: "community",
            redirect: "/community/comprehensive",
            components: {
                default: SubNav,
                top: TopNav,
            },
            meta: {
                title: "社区",
            },
            children: [
                {
                    path: "comprehensive",
                    name: "comprehensive",
                    components: {
                        default: SubNav,
                        top: TopNav,
                    },
                    meta: {
                        title: "综合",
                        name: "comprehensive",
                        father: "community",
                    },

                    children: [
                        {
                            path: "hot",
                            components: {
                                top: TopNav,
                                default: SubNav,
                            },
                        },
                    ],
                },
            ],
        },
        {
            path: "/knowledge",
            name: "knowledge",

            components: {
                default: SubNav,
                top: TopNav,
            },
        },
        {
            path: "/console",
            name: "console",
            components: {
                default: SubNav,
                top: TopNav,
            },
        },
        {
            path: "/home",
            name: "home",
            components: {
                default: SubNav,
                top: TopNav,
            },
        },
    ],
});
console.log(routes);

export default router;
