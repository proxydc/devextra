import AddAccount from "../admin/AddAccount.vue";
import EditAccount from "../admin/EditAccount.vue";
import AddDC from "../admin/AddDC.vue";
import EditDC from "../admin/EditDC.vue";
import Home from "../components/Home.vue";
import LoginAccount from "../components/LoginAccount.vue";
import NotFound from "../components/NotFound";
import PageEnd from "../components/PageEnd";
import { createRouter, createWebHashHistory } from "vue-router";
import { authGuard } from "../_helpers/auth-guard";
import admin from "../admin/admin.vue";
import AdminLayout from "../admin/admin_Layout.vue";
import user from "../User/user.vue";
import FormCandidatSaisie from "../candidats/FormCanSaisie.vue";
import DcDownload from "../candidats/ChildComponents/DcDownload.vue";
import conges from "../conges/conges.vue";
import AddConges from "../conges/AddConges.vue";
import EditConges from "../conges/EditConges.vue";
import Soldes from "../conges/Soldes.vue";
import expenses from "../expenses/expenses.vue";
import AddExp from "../expenses/AddExp.vue";
import EditExp from "../expenses/EditExp.vue";
import expensetypes from "../expenses/expense_types/expenseTypes.vue";
import AddExpTypes from "../expenses/expense_types/AddExpTypes.vue";
import banks from "../expenses/banks/banks.vue";
import AddBank from "../expenses/banks/AddBank.vue";
import paymenttypes from "../expenses/payment_types/paymentTypes.vue";
import AddPaymentTypes from "../expenses/payment_types/AddPaymentTypes.vue";
import person from "../expenses/person/person.vue";
import AddPerson from "../expenses/person/AddPerson.vue";
import shops from "../expenses/shops/shops.vue";
import AddShop from "../expenses/shops/AddShop.vue";

const routes = [
    {
        path: '/adminLayout',
        name: 'adminLayout',
        component: AdminLayout,
        children: [
            { name: "admin", component: admin, path: "/admin", beforeEnter: authGuard, },
            { name: "user", component: user, path: "/user", beforeEnter: authGuard, },
            { name: "AddAccount", component: AddAccount, path: "/addAccount", beforeEnter: authGuard, },
            { name: "EditAccount", component: EditAccount, path: "/editAccount/:id", beforeEnter: authGuard, },
            { name: "AddDC", component: AddDC, path: "/addDC", beforeEnter: authGuard, },
            { name: "EditDC", component: EditDC, path: "/editDC/:id", beforeEnter: authGuard, },
            { name: "FormCandidatSaisie", component: FormCandidatSaisie, path: "/formCandidatSaisie/:id", },
            { name: "DcDownload", component: DcDownload, path: "/dcDownload/:id", beforeEnter: authGuard, },
            { name: "conges", component: conges, path: "/conges", beforeEnter: authGuard, },
            { name: "AddConges", component: AddConges, path: "/addConges", beforeEnter: authGuard, },
            { name: "EditConges", component: EditConges, path: "/editConges/:id", beforeEnter: authGuard, },
            { name: "Soldes", component: Soldes, path: "/soldes", beforeEnter: authGuard, },
            { name: "expenses", component: expenses, path: "/expenses", beforeEnter: authGuard, },
            { name: "AddExp", component: AddExp, path: "/addExpenses", beforeEnter: authGuard, },
            { name: "EditExp", component: EditExp, path: "/editExpenses/:id", beforeEnter: authGuard, },
            { name: "expensetypes", component: expensetypes, path: "/expensetypes", beforeEnter: authGuard, },
            { name: "AddExpTypes", component: AddExpTypes, path: "/addExpTypes", beforeEnter: authGuard, },
            { name: "banks", component: banks, path: "/banks", beforeEnter: authGuard, },
            { name: "AddBank", component: AddBank, path: "/addBank", beforeEnter: authGuard, },
            { name: "paymenttypes", component: paymenttypes, path: "/paymenttypes", beforeEnter: authGuard, },
            { name: "AddPaymentTypes", component: AddPaymentTypes, path: "/addPaymentTypes", beforeEnter: authGuard, },
            { name: "person", component: person, path: "/person", beforeEnter: authGuard, },
            { name: "AddPerson", component: AddPerson, path: "/addPerson", beforeEnter: authGuard, },
            { name: "shops", component: shops, path: "/shops", beforeEnter: authGuard, },
            { name: "AddShop", component: AddShop, path: "/addShop", beforeEnter: authGuard, },
        ]
    },
    {
        name: "Home",
        component: Home,
        path: "/",
    },
    {
        name: "LoginAccount",
        component: LoginAccount,
        path: "/login",
    },
    {
        name: "NotFound",
        component: NotFound,
        path: "/:pathMatch(.*)*",
    },
    {
        name: "PageEnd",
        component: PageEnd,
        path: "/pageEnd",
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

/*router.beforeEach((to, from, next) => {
    if(to.matched[0].name =='AppDashboard')
    {
        authGuard()
    }
   // console.log(to, from)
    next()
})*/

export default router;