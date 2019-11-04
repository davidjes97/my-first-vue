<template>
  <div id="content">
    <div>
      <h2>Jesse David</h2>
    </div>
    <div id="expenseform">
      <label for="what">Description</label>
      <input type="text" v-model="expenseDesc" />
      <label for="amt">Amount</label>
      <input type="number" v-model.number="expenseAmt" />
      <label>Date</label>
      <input type="date" v-model="expenseDate" />
      <!-- <input type="date" v-model="expenseDate"/> -->
      <label>Category</label>
      <select type="text" v-model="expenseCategory">
        <option disabled value>Please select one</option>
        <option value="Food">Food</option>
        <option value="Gas">Gas</option>
        <option value="Education">Education</option>
        <option value="Clothing">Clothing</option>
      </select>

      <p></p>
      <button v-on:click="fbAddHandler">Add</button>
    </div>

    <div>
      <button id="removeButton" v-on:click="removeExpenseItem">Remove Selection(s)</button>
    </div>
    <table id="expenseList">
      <thead>
        <tr>
          <th id="date">Date</th>
          <th id="item">Description</th>
          <th id="category">Category</th>
          <th id="expense">Amount</th>
          <th id="select">Select</th>
        </tr>
      </thead>
      <tbody id="tbody">
        <tr v-for="(myExpense,pos) in myExpense" :key="pos">
          <td>{{myExpense.date}}</td>
          <td>{{myExpense.description}}</td>
          <td>{{myExpense.category}}</td>
          <td id="amount">{{myExpense.amount}}</td>
          <td id="checkbox">
            <input type="checkbox" v-bind:id="myExpense.mykey" v-on:change="selectionHandler" />
          </td>
        </tr>
        <tr>
          <td id="total" class="totalText" colspan="3">Total</td>
          <td id="total">{{ totalExpense.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { AppDB } from "../db-init.js";

export default {
  data() {
    return {
      myExpense: [],
      totalExpense: 0,
      expenseDesc: "",
      expenseAmt: 0,
      expenseDate: new Date(),
      expenseCategory: ""
    };
  },
  mounted() {
    AppDB.ref("budget").on("child_added", this.fbAddHandler);
    AppDB.ref("budget").on("child_removed", this.removeExpenseItem);
  },
  methods: {
    fbAddHandler(snapshot) {
      const item = snapshot.val();
      this.myExpense.push({ ...item, mykey: snapshot.key });
      this.totalExpense = this.myExpense.reduce(
        (sum, e) => sum + Number(e.amount),
        0
      );
    },

    removeExpenseItem(snapshot){
      this.myExpense = this.myExpense.filter(z => z.mykey != snapshot.key);
      this.totalExpense = this.myExpense.reduce(
        (sum, z) => sum + Number(z.amount),
        0
      );
    },

    selectionHandler(changeEvent) {
      const whichKey = changeEvent.target.id;
      const eventTarget = changeEvent.target;

      eventTarget;
      if (changeEvent.target.checked) {
        this.userSelections.push(String(whichKey));
      } else {
        this.userSelections = this.userSelections.filter(e=> {         
          return e != whichKey;
        });
      }
      this.length = this.userSelections.length;
      },
      deleteSelections(){
        this.userSelections.forEach(victimKey => {
          AppDB.ref("budget")
            .child(victimKey)
            .remove();
        });
      }
    }
  }
</script>

<style scoped>
h2 {
  color: black;
}

#amount {
  text-align: right;
}

thead {
  font-weight: bold;
  background: #615206;
  -webkit-text-fill-color: white;
}

#tbody tr:nth-child(odd) {
  background: #e9be61;
}

#tbody tr:nth-child(even) {
  background: #d1911b;
}

#total {
  background: white;
  text-align: right;
}

.totalText {
  font-weight: bold;
}
#expenseform {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  border-radius: 10px;
  border: 2px solid gray;
  margin: 20px;
  padding: 10px;
  width: fit-content;
  height: fit-content;
}

#expenseList {
  border: 1px solid black;
  margin: 2em;
  width: fit-content;
  padding: 5px;
}

#checkbox {
  text-align: center;
}

button {
  border-radius: 5px;
  margin: 5px;
  width: fit-content;
  margin-left: 60%;
}

label {
  color: black;
}

#what {
  margin: 5px;
  width: fit-content;
}

#amt {
  width: fit-content;
  margin: 5px;
  text-align: center;
}

#content {
  display: grid;
  /* grid-template-columns: 1fr 1fr; */
  grid-template-rows: 1fr 8fr;
}

#label {
  font-weight: bold;
  font-size: 20px;
}

#data {
  align-content: center;
  width: fit-content;
  height: fit-content;
}
</style>