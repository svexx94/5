class Person {
  #age;

  constructor(name, age) {
    if (!name || typeof name !== "string") {
      throw new Error("Person: name обязателен и должен быть строкой");
    }
    this.name = name;
    this.age = age;
  }

  get age() {
    return this.#age;
  }

  set age(value) {
    if (typeof value !== "number" || Number.isNaN(value)) {
      throw new Error("Person: возраст должен быть числом");
    }
    if (value < 0) {
      throw new Error("Person: возраст не может быть отрицательным");
    }
    if (value > 150) {
      throw new Error("Person: возраст не может превышать 150");
    }
    this.#age = value;
  }

  getInfo() {
    return `${this.name}, ${this.#age} лет`;
  }
}

const person = new Person("Аня", 25);
console.log(person.age);
console.log(person.getInfo());

person.age = 30;
console.log(person.age);

try { person.age = -5; } catch (e) { console.log("Ошибка:", e.message); }
try { new Person("Иван", -1); } catch (e) { console.log("Ошибка:", e.message); }


class BankAccount {
  #balance;
  #owner;

  constructor(owner, initialBalance = 0) {
    if (!owner || typeof owner !== "string") {
      throw new Error("BankAccount: owner обязателен");
    }
    if (typeof initialBalance !== "number" || initialBalance < 0) {
      throw new Error("BankAccount: начальный баланс не может быть отрицательным");
    }
    this.#owner = owner;
    this.#balance = initialBalance;
  }

  get balance() {
    return this.#balance;
  }

  get owner() {
    return this.#owner;
  }

  deposit(amount) {
    if (typeof amount !== "number" || Number.isNaN(amount)) {
      throw new Error("deposit: сумма должна быть числом");
    }
    if (amount <= 0) {
      throw new Error("deposit: сумма должна быть положительной");
    }
    this.#balance += amount;
    return this.#balance;
  }

  withdraw(amount) {
    if (typeof amount !== "number" || Number.isNaN(amount)) {
      throw new Error("withdraw: сумма должна быть числом");
    }
    if (amount <= 0) {
      throw new Error("withdraw: сумма должна быть положительной");
    }
    if (amount > this.#balance) {
      throw new Error("withdraw: недостаточно средств на счёте");
    }
    this.#balance -= amount;
    return this.#balance;
  }

  getInfo() {
    return `Счёт владельца ${this.#owner}: ${this.#balance} ₽`;
  }
}

const acc = new BankAccount("Аня", 1000);
console.log(acc.getInfo());

acc.deposit(500);
console.log(acc.balance);

acc.withdraw(300);
console.log(acc.balance);

try { acc.withdraw(10000); } catch (e) { console.log("Ошибка:", e.message); }
try { acc.deposit(-100); }  catch (e) { console.log("Ошибка:", e.message); }
try { acc.withdraw(0); }    catch (e) { console.log("Ошибка:", e.message); }


class Password {
  #hash;

  constructor(password) {
    if (!password || typeof password !== "string") {
      throw new Error("Password: пароль обязателен и должен быть строкой");
    }
    if (password.length < 6) {
      throw new Error("Password: пароль должен содержать минимум 6 символов");
    }
    this.#hash = Password.#hashString(password);
  }

  static #hashString(str) {
    return str.split("").reverse().join("") + "_" + str.length;
  }

  checkPassword(input) {
    if (typeof input !== "string") {
      return false;
    }
    return Password.#hashString(input) === this.#hash;
  }
}

const pwd = new Password("secret123");
console.log(pwd.checkPassword("secret123"));
console.log(pwd.checkPassword("wrongpass"));
console.log(pwd.checkPassword(""));
console.log(Object.keys(pwd));

try { new Password("123"); } catch (e) { console.log("Ошибка:", e.message); }
try { new Password(""); }    catch (e) { console.log("Ошибка:", e.message); }