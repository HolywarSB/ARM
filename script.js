"use strict";

const month = 12;  // месяцев в году
const k = 0.5;     // банковский коэфициент

const btn = document.querySelector('#bank_start');   // кнопка запуска предложение от банка
const btnInd = document.querySelector('#bank_client_start'); // кнопка запуска индивидуального предложения

const age = document.querySelector('#form_age'); // зона ввода возраста
const salaryUser = document.querySelector('#form_salary'); // зона ввода зарплаты
const expiriensUser = document.querySelector('#form_experience'); // зона ввода стажа работы
const money = document.querySelector('#form_sum'); // зона ввода суммы кредита
const inn = document.querySelector('#form_inn'); // зона ввода инн
const phone = document.querySelector('#form_phone'); // зона ввода телефона

const btnSwith = document.querySelector('#bank_client_swith'); // кнопка поиска клиента из локал сторадж
const searchClient = document.querySelector('#Search_Client'); // поле ввода для поиска клиента

const formMaine = document.querySelector('#form_main_create'); // выбираем див для создания html кода\
const localStorageView = document.querySelector('#Local_storage_view'); // выбираем див для записи ключа из локал стораджа

/*money.addEventListener("input", () => {
    money.value = money.value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
})*/

const date = document.querySelector('#form_date'); // зона ввода срока кредита
const rate = document.querySelector('#form_rate'); // зона ввода процентов
const nameUser = document.querySelector('#form_name'); // зона ввода ФИО
const cost = document.querySelector('#form_costs'); // зона ввода расходов

clientView (); // выводим содержимое хранилища на страницу

let tasks = [];

function Client (input_age, input_salary, input_experience, input_cost, input_name, input_rate, input_sum, input_date, input_inn, input_phone) {
    this.ageUser = input_age;
    this.salaryUser = input_salary;
    this.expiriensUser = input_experience;
    this.cost = input_cost;
    this.nameUser = input_name;
    this.dateUser = input_date;
    this.sumUser = input_sum;
    this.rateUser = input_rate;
    this.innUser = input_inn;
    this.phoneUser = input_phone
    this.approv = true;
}

// функция добавления в LocalStorage
const updateLocal = () => {
    localStorage.setItem(`${inn.value}`, JSON.stringify(tasks));
}

// Добавляем из localStorage содержимое на страницу /////////////////
function clientView () {
    if (localStorage.length > 0) {
        for (let i = 0; i !== localStorage.length; i++ ) {
            let keys = Object.keys(localStorage); // получение ключей объекта(LocalStorage) в виде массива

            let lsObj = JSON.parse(localStorage[keys[i]]); // сделали из строки объект и завели в переменную

            let viewInn = lsObj[0].innUser; // индекс 0 потому что каждый объект состоит из массива с одной записью
            let viewName = lsObj[0].nameUser;
            let approv = lsObj[0].approv;

            function btnLocalStorage (viewName, viewInn, i) {
            return `
            <div class="btn_view_css justify-content-between" id="view_btn${viewInn}">
                <img src="img/checked.svg" class="img_view" id="view_img${viewInn}" alt="" height="20">
                <div>
                <div type="button" ondblclick="loadKey (${viewInn})" class="btn_view">${viewName} ИНН: ${viewInn}</div>
                </div>
                <img src="img/delete.svg" onclick="deleteBtnView (${viewInn})" type="button" id="view_btn${i}_delete" class="btn_view_delete" alt="" height="28">
            </div>
            ` 
            } // Размножаем дивы с линками из локал сторадж

            function btnLocalStorageApprov (approv, viewInn) {
                if (approv == true) {
                } else {
                    document.querySelector(`#view_img${viewInn}`).src = "img/cancel.svg";
                    document.querySelector(`#view_img${viewInn}`).classList.add('img_view_ban');
                }
            }

            let btnLS = btnLocalStorage (viewName, viewInn, i);

            function CreateBtnLocalStorage (btnLS) {
            localStorageView.innerHTML += btnLS;
            }

            CreateBtnLocalStorage (btnLS);
            btnLocalStorageApprov (approv, viewInn);
        }
    }
}

// Функция удаления клиента из базы
function deleteBtnView (inn) {
    localStorage.removeItem(inn);
    document.querySelector(`#view_btn${inn}`).innerHTML = "";
}

// функция загрузки клиента и пересчета по клику из правой стороны
function loadKey (inn) {
    console.log(inn);
    tasks = JSON.parse(localStorage.getItem(inn));
    console.log(tasks[0].sumUser);
    removeClass ();
    Clac ();
}

// Добавляем кнопку-ключ
function NewKeyInLocalStorage () {
    localStorageView.innerHTML = "";
    clientView ();
}

/////////////////////////////////////////////ВАЛИДАЦИЯ ВХОДЯЩИХ ДАННЫХ НАЧАЛО///////////////////////////////////

function validAge (age) {
    if (isNaN (+age.value) || +age.value === 0) {
        age.classList.add('error');
} else {age.classList.remove('error');
}}

function validSalary (salaryUser) {
    if (isNaN(+salaryUser.value) || +salaryUser.value === 0) {
        salaryUser.classList.add('error');
} else {salaryUser.classList.remove('error');
}}

function validExp (expiriensUser) {
    if (isNaN(+expiriensUser.value) || +expiriensUser.value === '0' || expiriensUser.value === '') {     
        expiriensUser.classList.add('error');
} else {expiriensUser.classList.remove('error');
}}

function validSum (money) {
    if (isNaN(+money.value) || +money.value === 0) {
        money.classList.add('error');
} else {money.classList.remove('error');
}}

function validDate (date) {
    if (isNaN(+date.value) || +date.value === 0) {
        date.classList.add('error');
} else {date.classList.remove('error');
}}

function validRate (rate) {
    if (isNaN(+rate.value) || +rate.value === "0" || rate.value === "") {
        rate.classList.add('error');
} else {rate.classList.remove('error');
}}

function validCost (cost) {
    if (isNaN(+cost.value) || +cost.value === "0" || cost.value === "") {
        cost.classList.add('error');
} else {cost.classList.remove('error');
}}

function validName (nameUser) {
    if (nameUser.value==="") {
        nameUser.classList.add('error');
} else {nameUser.classList.remove('error');
}}

function validInn (inn) {
    if (isNaN(+inn.value) || inn.value==="" || inn.value.length < 6) {
        inn.classList.add('error');
} else {inn.classList.remove('error');
}}

function validPhone (phone) {
    if (phone.value==="" || phone.value.length < 16) {
        phone.classList.add('error');
} else {phone.classList.remove('error');
}}

/////////////////////////////////////////////ВАЛИДАЦИЯ ВХОДЯЩИХ ДАННЫХ КОНЕЦ///////////////////////////////////

// Расчет максимального платежа
function maxPayment (salary, cost) {
    let maxPayment = ((salary*0.87) - cost)*k;
    return maxPayment;
}

// Добавляем кастомный див
function divFormMaine () {
    return `
    <div class="form_main justify-content-between">
        <div id="form_main_sum">№<br>Месяца</div>
    <div>Платеж<br>(руб)</div>
    <div>
        <div>Выплата<br>процентов<br>(руб)</div>
    </div>
    <div>
        <div>Погашение<br>основного<br>долга (руб)</div>
    </div>
    <div>
        <div id="form_main_debt">Остаток<br>(руб)</div>
    </div>
</div>
`
}

function CreateDivFormMaine () {
    formMaine.innerHTML = divFormMaine ();
}

// фугкция вывода номера телефона в html
function phoneHTML () {
    document.querySelector("#form_output_phone").innerHTML = "Телефон: ";
    document.querySelector("#form_output_phone_a").href = "tel:" + tasks[0].phoneUser;
    document.querySelector("#form_output_phone_a").innerHTML = tasks[0].phoneUser;
}

// функция зачистки дивов и вывод информации при отказе по кредиту
function rejectionDiv () {
    document.querySelector("#form_output_name").innerHTML = tasks[0].nameUser;
    document.querySelector("#form_output_approv").innerHTML = "";
    document.querySelector("#form_output_inn").innerHTML = "ИНН: " + tasks[0].innUser;
    document.querySelector("#form_output_age").innerHTML = "";
    document.querySelector("#form_output_sum").innerHTML = "";
    document.querySelector("#form_output_date").innerHTML = "";
    document.querySelector("#form_output_rate").innerHTML = "";
    document.querySelector("#Month").innerHTML = "";
    document.querySelector("#ResultHome").innerHTML = "";
    document.querySelector("#MainRateHome").innerHTML = "";
    document.querySelector("#MainDebtHome").innerHTML = "";
    document.querySelector("#MainCreditBalance").innerHTML = "";
    if (document.querySelector(".form_main") != null) {
        document.querySelector(".form_main").innerHTML = "";
    }
}

function removeClass () {
    money.classList.remove('error');
    age.classList.remove('error');
    salaryUser.classList.remove('error');
    expiriensUser.classList.remove('error');
    date.classList.remove('error');
    rate.classList.remove('error');
    cost.classList.remove('error');
    nameUser.classList.remove('error');
    inn.classList.remove('error');
    searchClient.classList.remove('error');
    phone.classList.remove('error');
}

//////////////////////////////////////////////////////////////////////////////////
function Clac () {
    if (tasks[0].expiriensUser < 6) {
        alert ("В кредите отказано");
        rejectionDiv ();
        document.querySelector("#form_output_approv").innerHTML = "Отказ в кредитовании. Стаж менее 6 месяцев.";
        document.querySelector(".img_view").src = "img/cancel.svg";
        document.querySelector(".img_view").classList.add('img_view_ban');
        console.log (tasks[0].approv);
        tasks[0].approv = false;
        console.log (tasks[0].approv);
        console.log (tasks[0].innUser);
        localStorage.setItem(tasks[0].innUser, JSON.stringify(tasks));
        phoneHTML ();
    } else {
        let maxPay = maxPayment (tasks[0].salaryUser, tasks[0].cost);
        console.log ('Максимальный ежемесячный платеж', maxPay);

        let RateCalculation = (tasks[0].rateUser/month)/100; // Процентная ставка одинаковая для расчетов
        console.log ('Ежемесячная % ставка', RateCalculation);

        let Result = tasks[0].sumUser*((RateCalculation*(Math.pow (1+RateCalculation, tasks[0].dateUser))))/(((Math.pow (1+RateCalculation, tasks[0].dateUser))-1));
        console.log ('Ежемесячный платеж', Result);

        if (Result > maxPay) {
            alert ("В кредите отказано");
            rejectionDiv (); // зачистка дивов при отказе в кредите
            document.querySelector("#form_output_approv").innerHTML = "Отказ в кредитовании. По платежу.";
            document.querySelector(".img_view").src = "img/cancel.svg";
            document.querySelector(".img_view").classList.add('img_view_ban');
            console.log (tasks[0].approv);
            tasks[0].approv = false;
            console.log (tasks[0].approv);
            console.log (tasks[0].innUser);
            localStorage.setItem(tasks[0].innUser, JSON.stringify(tasks));
            phoneHTML ();
        } else {
            document.querySelector("#form_output_approv").innerHTML = "Кредит одобрен!";
            document.querySelector(".img_view").src = "img/checked.svg";
            document.querySelector(".img_view").classList.remove('img_view_ban');
            document.querySelector("#form_output_name").innerHTML = tasks[0].nameUser;
            document.querySelector("#form_output_age").innerHTML = tasks[0].ageUser + " лет";
            document.querySelector("#form_output_inn").innerHTML = "ИНН: " + tasks[0].innUser;
            phoneHTML ();
            document.querySelector("#form_output_sum").innerHTML = "Сумма кредита " + tasks[0].sumUser + " .руб";
            document.querySelector("#form_output_date").innerHTML = "Срок кредита " + tasks[0].dateUser + " .мес";
            document.querySelector("#form_output_rate").innerHTML = "Процентая ставка " + tasks[0].rateUser + " %";
            CreateDivFormMaine (); // Создаем заголовки для вывода результата
            console.log ('Ежемесячный платеж', Result);
    
            let MainRate = tasks[0].sumUser*(tasks[0].rateUser/100)*(30/366);
            console.log ('Выплата процентов', MainRate);
    
            let MainDebt = Result-MainRate;
            console.log ('В погашение основного долга', MainDebt);
    
            let CreditBalance = tasks[0].sumUser - MainDebt;
            console.log ('Остаток', CreditBalance);
            tasks[0].sumUser = CreditBalance;
            
            // Если процентная ставка 0%
            if (RateCalculation === 0) {
            Result = tasks[0].sumUser/tasks[0].dateUser;
            console.log ('Ежемесячный платеж, при 0%', Result);
    
            MainDebt = Result;
            console.log ('В погашение основного долга, при 0%', MainDebt);
    
            CreditBalance = tasks[0].sumUser - MainDebt;
            console.log ('Остаток, при 0%', CreditBalance);
            tasks[0].sumUser = CreditBalance;
            }
    
            document.querySelector("#Month").innerHTML = "1";
            document.querySelector("#ResultHome").innerHTML = Result.toFixed(2); // ежемесячный платеж
            document.querySelector("#MainRateHome").innerHTML = MainRate.toFixed(2); // выпдата процентов
            document.querySelector("#MainDebtHome").innerHTML = MainDebt.toFixed(2); // в погашение основного долга
            document.querySelector("#MainCreditBalance").innerHTML = CreditBalance.toFixed(2); // остаток 
            console.log ('--------------------------------------------------------------------------------------------------');
    
            for (let i = 1; i < tasks[0].dateUser; i++) {
                console.log (i);
    
                MainRate = tasks[0].sumUser*(tasks[0].rateUser/100)*(30/366);
                console.log ('Выплата процентов', MainRate);
            
                MainDebt = Result-MainRate;
                console.log ('В погашение основного долга', MainDebt);
            
                CreditBalance = tasks[0].sumUser - MainDebt;
            
                if (CreditBalance < 0) {
                    CreditBalance = 0;
                }
                    console.log ('Остаток', CreditBalance);
            
                tasks[0].sumUser = CreditBalance;
    
                let innerDivMonth = document.createElement("div");
                Month.appendChild(innerDivMonth);
                innerDivMonth.classList.add('output_cust_create');
                innerDivMonth.innerHTML = (i+1); // Вывод месяца
    
                let innerDivResult = document.createElement("div");
                ResultHome.appendChild(innerDivResult);
                innerDivResult.classList.add('output_cust_create');
                innerDivResult.innerHTML = Result.toFixed(2);  // Вывод ежемесячного платежа
    
                let innerDivRate = document.createElement("div");
                MainRateHome.appendChild(innerDivRate);
                innerDivRate.classList.add('output_cust_create');
                innerDivRate.innerHTML = MainRate.toFixed(2); // выплата процентов 
    
                let innerDivDebt = document.createElement("div");
                MainDebtHome.appendChild(innerDivDebt);
                innerDivDebt.classList.add('output_cust_create');
                innerDivDebt.innerHTML = MainDebt.toFixed(2); // погашение основного долга 
    
                let innerDivBalance = document.createElement("div");
                MainCreditBalance.appendChild(innerDivBalance);
                innerDivBalance.classList.add('output_cust_create');
                innerDivBalance.innerHTML = CreditBalance.toFixed(2); // остаток
    
                console.log ('--------------------------------------------------------------------------------------------------');
            }
        }
    }
}
////////////////////////////////////////////////////////////////////////////////////////

// Создание обработчика //////////////////////////////////////////////////////////////

btn.addEventListener('click', () => {
    if ( (isNaN(+money.value) || +money.value === 0) || (isNaN(+age.value)) || (isNaN(+salaryUser.value) || +salaryUser.value === 0) || (isNaN(+expiriensUser.value) || +expiriensUser.value === '0' || expiriensUser.value === "") || (isNaN(+date.value) || +date.value === 0) || (isNaN(+rate.value) || +rate.value === "0") || (isNaN(+cost.value) || +cost.value === "0") || (nameUser.value === "") || (isNaN(+inn.value) || inn.value==="" || inn.value.length < 6) || (phone.value==="" || phone.value.length < 16)  )
    {
        validSum (money);
        validAge (age);
        validSalary (salaryUser);
        validDate (date);
        validRate (rate);
        validExp (expiriensUser);
        validCost (cost);
        validName (nameUser);
        validInn (inn);
        validPhone (phone);
        searchClient.classList.remove('error');
    } else {  // Мы не знаем какое поле останется красным последним -> очищаем все поля при положительной валидации
        removeClass ();
        // Проверка на стаж работы и возраст
        if (+age.value < 18) {
            alert ("В кредите отказано");
            rejectionDiv ();
            document.querySelector("#form_output_approv").innerHTML = "Отказ в кредитовании. Менее 18 лет.";
        } else {
            tasks.unshift(new Client (age.value, salaryUser.value, expiriensUser.value, cost.value, nameUser.value, rate.value, money.value, date.value, inn.value, phone.value));
                if (tasks.length > 1) {
                tasks.pop();
                }
            updateLocal();
            console.log('Клиент добавлен в базу');
            Clac (); // Основные вычисления и вывод
            NewKeyInLocalStorage (); // функция добавления новой записи в хранилище и вывод на экран
        }
    }
})

// Обработчик кнопки смены клиента
btnSwith.addEventListener('click', () => {
    if (isNaN(+searchClient.value) || searchClient.value==="" || searchClient.value.length < 6) {
        validInn (searchClient);
    } else {
        removeClass ();
        tasks = JSON.parse(localStorage.getItem(`${searchClient.value}`));
            try {
                console.log(tasks[0].sumUser);
                console.log(typeof(tasks[0].sumUser));
                Clac ();
            } catch (err) {
                alert ("Нет совпадений по ИНН");
        }
    }
})