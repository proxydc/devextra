select a.*, et.label as expense_type_label, s.label as shop_label, p.firstname, b.bankname, py.label as payment_type_label
from Expense a
inner join expense_types et on et.id=a.expense_type_id 
inner join shop s on s.id=a.shop_id
inner join person p on p.id=a.person_id
inner join banks b on b.id=a.bank_id
inner join payment_types py on py.id=a.payment_id
order by a.datepurchase desc