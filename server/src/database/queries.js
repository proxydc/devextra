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
const getExpenses = "select a.id, a.date_debut, a.date_fin, a.type_Expenses, a.nbjours, a.descriptions, r.label from Expenses a, type_Expenses r where a.type_Expenses = r.id order by a.id asc";
const getExpensesById = "select * from Expenses where id = $1";
const checkExpensesExists = "select * from Expenses a where a.date_debut = $1";
const addExpenses = "insert into Expenses(date_debut, date_fin, type_Expenses, nbjours, descriptions) values ($1, $2, $3, $4, $5)";
const updateExpenses = "update Expenses set date_debut = $2, date_fin = $3,  type_Expenses = $4, nbjours = $5, descriptions = $6 where id = $1";
const deleteExpensesById = "delete from Expenses where id = $1";

//queries reg type_Expenses
const getAllTypeExpenses = "select * from type_Expenses";

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
    checkExpensesExists,
    addExpenses,
    updateExpenses,
    deleteExpensesById,

    getAllTypeExpenses,

};