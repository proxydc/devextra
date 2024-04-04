//queries reg accounts
const getAccounts = "select a.*, r.role_name from account a, role r where a.role_id = r.id order by a.id asc";
const getAccountById = "select * from account where id = $1";
const checkLoginExists = "select * from account a where a.login_name = $1";
const addAccount = "insert into account(login_name, display_name, pass_word, role_id) values ($1, $2, $3, $4)";
const updateAccount = "update account set display_name = $2, pass_word = $3, role_id = $4 where id = $1";
const deleteAccountById = "delete from account where id = $1";
const getAuthentification = "select * from account a where a.login_name = $1 and a.pass_word = $2";

//queries reg DCS
//const getDCs = "select d.*, ds.label as status_name from dc d, dc_status ds where d.dc_status = ds.id";
const getDCs = "select d.*, ds.label as status_name, acc.display_name as manager_name from dc d, dc_status ds, account acc where d.dc_status = ds.id and d.manager_id = acc.id";
const getDCsByManagerID = "select d.*, ds.label as status_name, acc.display_name as manager_name from dc d, dc_status ds, account acc where d.dc_status = ds.id and d.manager_id = acc.id and d.manager_id = $1";
const getDCById = "select d.*, ds.label as status_name from dc d, dc_status ds where d.id = $1 and d.dc_status = ds.id";
const getDCByIdCandidat = "select d.*, ds.label as status_name from dc d, dc_status ds where d.id = $1 and d.dc_status = ds.id";
const getDCDocById = "select dc.document, dc.familyname, dc.firstname, dc.nbexps, dc.poste from dc where id = $1 limit 1";
const checkDCExists = "select a from dc a where a.email = $1";
const addDC = "insert into dc(familyname, firstname, email, dc_status, document, manager_id, nbexps, creation_date, modification_date) values ($1, $2, $3, $4, $5, $6, 0, $7, $8)"; // add tags ici
const updateDCByAdmin = "update dc set familyname=$2, firstname=$3, email=$4, dc_status=$5, tags = $6, nbexps = $7, poste = $8, modification_date = $9 where id = $1"; //controle sur email
const updateDCDoc = "update dc set document = $2, dc_status=$3 where id = $1";
const deleteDCById = "delete from dc where id = $1";

//queries reg DC-Status
const getAllDcStatus = "select * from dc_status";


//queries reg conges 
const getConges = "select a.id, a.date_debut, a.date_fin, a.type_conges, a.nbjours, a.descriptions, r.label from conges a, type_conges r where a.type_conges = r.id order by a.id asc";
const getCongesById = "select * from conges where id = $1";
const checkCongesExists = "select * from conges a where a.date_debut = $1";
const addConges = "insert into conges(date_debut, date_fin, type_conges, nbjours, descriptions) values ($1, $2, $3, $4, $5)";
const updateConges = "update conges set date_debut = $2, date_fin = $3,  type_conges = $4, nbjours = $5, descriptions = $6 where id = $1";
const deleteCongesById = "delete from conges where id = $1";

//queries reg type_conges
const getAllTypeConges = "select * from type_conges";

//queries reg soldes
const getSoldes = "select * from compteur";
const getSoldesById = "select * from compteur where id = $1";
const updateSoldes = "update compteur set cpanneeencours = $2, cpanneeprecedent = $3, cppris = $4, cprestant = $5, rtttotal = $6, rttpris = $7, rttrestant = $8, rttetotal = $9,rttepris = $10, rtterestant = $11, datederniermodification = $12 where id = $1";

//queries reg Expenses 
const getExpenses = "select a.*, et.label as expense_type_label, s.label as shop_label, p.firstname, b.bankname, py.label as payment_type_label "+
                        "from expense a "+
                        "inner join expense_types et on et.id=a.expense_type_id "+
                        "inner join shop s on s.id=a.shop_id "+
                        "inner join person p on p.id=a.person_id "+
                        "inner join banks b on b.id=a.bank_id "+
                        "inner join payment_types py on py.id=a.payment_id "+
                        "order by a.datepurchase desc";
const getExpensesById = "select a.*, et.label as expense_type_label, s.label as shop_label, p.firstname, b.bankname, py.label as payment_type_label "+
                        "from expense a "+
                        "inner join expense_types et on et.id=a.expense_type_id "+
                        "inner join shop s on s.id=a.shop_id "+
                        "inner join person p on p.id=a.person_id "+
                        "inner join banks b on b.id=a.bank_id "+
                        "inner join payment_types py on py.id=a.payment_id "+ 
                        "where a.id = $1";
const addExpenses = "insert into expense(expense_type_id, shop_id, person_id, bank_id, payment_id, amount, details, datepurchase) values ($1, $2, $3, $4, $5, $6, $7, $8)";
const updateExpenses = "update expense set expense_type_id = $2, shop_id = $3, person_id = $4, bank_id = $5, payment_id = $6, amount = $7, details = $8, datepurchase = $9 where id = $1";
const deleteExpensesById = "delete from expense where id = $1";

//queries reg type_Expenses
const getAllTypeExpenses = "select * from expense_types";
const getExpenseTypesById = "select * from expense_types  where id = $1";
const addExpenseTypes = "insert into expense_types(label) values ($1)";
const deleteExpenseTypesById = "delete from expense_types where id = $1";

//queries reg shops
const getAllShops = "select * from shop";
const getShopById = "select * from shop where id = $1";
const addShop = "insert into shop(label) values ($1)";
const deleteShopById = "delete from shop where id = $1";

//queries reg person
const getAllPerson = "select * from person";
const getPersonById = "select * from person where id = $1";
const addPerson = "insert into person(firstname, familyname) values ($1, $2)";
const deletePersonById = "delete from person where id = $1";

//queries reg banks
const getAllBanks = "select * from banks";
const getBankById = "select * from banks where id = $1";
const addBank = "insert into banks(bankname) values ($1)";
const deleteBankById = "delete from banks where id = $1";

//queries reg payment_types
const getAllPaymentTypes = "select * from payment_types";
const getPaymentTypesById = "select * from payment_types where id = $1";
const addPaymentTypes = "insert into payment_types(label) values ($1)";
const deletePaymentTypesById = "delete from payment_types where id = $1";

//queries reg income 
const getIncomes = "select a.*, pr.label as provider_label, p.firstname, b.bankname, i.label as income_type_label "+
                        "from income a "+
                        "inner join provider_types pr on pr.id=a.provider_id "+
                        "inner join person p on p.id=a.person_id "+
                        "inner join banks b on b.id=a.credited_bank_id "+
                        "inner join income_types i on i.id=a.income_type_id "+
                        "order by a.daterecieved desc";
const getIncomeById = "select a.*, pr.label as provider_label, p.firstname, b.bankname, i.label as income_type_label "+
                        "from income a "+
                        "inner join provider_types pr on pr.id=a.provider_id "+
                        "inner join person p on p.id=a.person_id "+
                        "inner join banks b on b.id=a.credited_bank_id "+
                        "inner join income_types i on i.id=a.income_type_id "+
                        "where a.id = $1";

const addIncome = "insert into income(provider_id, person_id, credited_bank_id, income_type_id, amount, details, daterecieved) values ($1, $2, $3, $4, $5, $6, $7)";
const updateIncome = "update income set provider_id = $2, person_id = $3, credited_bank_id = $4, income_type_id = $5, amount = $6, details = $7, daterecieved = $8 where id = $1";
const deleteIncomeById = "delete from income where id = $1";


//queries reg provider_types
const getAllProviderTypes = "select * from provider_types";
const getProviderTypesById = "select * from provider_types where id = $1";
const addProviderTypes = "insert into provider_types(label) values ($1)";
const deleteProviderTypesById = "delete from provider_types where id = $1";


//queries reg income_types
const getAllIncomeTypes = "select * from income_types";
const getIncomeTypesById = "select * from income_types where id = $1";
const addIncomeTypes = "insert into income_types(label) values ($1)";
const deleteIncomeTypesById = "delete from income_types where id = $1";


//queries reg tasks
const getTasks= "select a.*, p.firstname from task a, person p where a.person_id = p.id order by a.actiondate asc";
const getTaskById = "select * from task where id = $1";
const addTask = "insert into task(task_details, person_id, actiondate) values ($1, $2, $3)";
const updateTask = "update task set task_details = $2, person_id = $3, actiondate = $4 where id = $1";
const deleteTaskById = "delete from task where id = $1";

//queries reg bourse
const getBourses= "select a.*, p.firstname from bourse a, person p where a.person_id = p.id order by a.dossier_date asc";
const getBourseById = "select * from bourse where id = $1";
const addBourse = "insert into bourse(person_id, annee, echelon, bourse_amount, bourse_merit, dossier_date, is_validated, impot) values ($1, $2, $3, $4, $5, $6, $7, $8)";
const updateBourse = "update bourse set person_id = $2, annee = $3, echelon = $4, bourse_amount = $5, bourse_merit = $6, dossier_date = $7, is_validated = $8, impot = $9 where id = $1";
const deleteBourseById = "delete from bourse where id = $1";

//queries reg bourse
const getSgbs = "select a.*, p.firstname, n.firstname as nomineename, g.firstname as guardianname, b.bankname from sgb_bonds a, person p, person n, person g, banks b where a.person_id = p.id and a.nominee_id = n.id and a.guardian_id = g.id and a.bank_id = b.id order by a.end_date asc";
const getSgbsInt = "select a.*, p.firstname, n.firstname as nomineename, g.firstname as guardianname, b.bankname from sgb_bonds a, person p, person n, person g, banks b where a.person_id = p.id and a.nominee_id = n.id and a.guardian_id = g.id and a.bank_id = b.id order by a.end_date asc";
const getSgbById = "select * from sgb_bonds where id = $1";
const addSgb = "insert into sgb_bonds(person_id, bank_id, nominee_id, guardian_id, investor_id, bond_ids, interest_percentage, units, unit_price, purchased_unit_price, bond_details, amount, purchase_date, starting_date, end_date) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,$15)";
const updateSgb = "update sgb_bonds set person_id = $2, bank_id = $3, nominee_id = $4, guardian_id = $5, investor_id = $6, bond_ids = $7, interest_percentage = $8, units = $9, unit_price = $10, purchased_unit_price = $11, bond_details = $12, amount = $13, purchase_date = $14, starting_date = $15, end_date = $16 where id = $1";
const deleteSgbById = "delete from sgb_bonds where id = $1";


module.exports = {
    getAuthentification,
    getAccounts,
    getAccountById,
    checkLoginExists,
    addAccount,
    updateAccount,
    deleteAccountById,

    getDCs,
    getDCsByManagerID,
    getDCById,
    getDCByIdCandidat,
    getDCDocById,
    checkDCExists,
    addDC,
    deleteDCById,
    updateDCByAdmin,
    updateDCDoc,
    getAllDcStatus,

    getConges,
    getCongesById,
    checkCongesExists,
    addConges,
    updateConges,
    deleteCongesById,

    getAllTypeConges,
    getSoldes,
    updateSoldes,
    getSoldesById,

    getExpenses,
    getExpensesById,
    addExpenses,
    updateExpenses,
    deleteExpensesById,

    getAllTypeExpenses,
    getExpenseTypesById,
    addExpenseTypes,
    deleteExpenseTypesById,

    getAllShops,
    getShopById,
    addShop,
    deleteShopById,

    getAllPerson,
    getPersonById,
    addPerson,
    deletePersonById,
   
    getAllBanks,
    getBankById,
    addBank,
    deleteBankById,
   
    getAllPaymentTypes,
    getPaymentTypesById,
    addPaymentTypes,
    deletePaymentTypesById,

    getIncomes,
    getIncomeById,
    addIncome,
    updateIncome,
    deleteIncomeById,

    getAllProviderTypes,
    getProviderTypesById,
    addProviderTypes,
    deleteProviderTypesById,

    getIncomeTypesById,
    getAllIncomeTypes,
    addIncomeTypes,
    deleteIncomeTypesById,

    getTasks,
    getTaskById,
    addTask,
    updateTask,
    deleteTaskById,

    getBourses,
    getBourseById,
    addBourse,
    updateBourse,
    deleteBourseById,

    getSgbs,
    getSgbsInt,
    getSgbById,
    addSgb,
    updateSgb,
    deleteSgbById,

};