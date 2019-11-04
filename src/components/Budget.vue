<template>
  <div id="content">
    <div>
      <h2>Jesse David</h2>
    </div>
    <div id="expenseform">
      <v-text-field label="Description" type="text" v-model="expenseDesc" />
      <v-text-field label="Amount" type="number" v-model="expenseAmt"/>
      <v-text-field label="Date" type="date" v-model="expenseDate"/>
      <v-select
        v-model="expenseCat"
        v-bind:items="expenseCategory"
        label="Category"
      ></v-select>
      <v-btn color="primary" @click="yourButtonHandler">Add</v-btn>
    </div>

    <div>
      <v-btn color="primary" id="removeButton" @click="remove" v-bind:disabled="userSelections.length == 0">Remove Selection(s)</v-btn>
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
          <td id="total" class="totalText" colspan="4">Total</td>
          <td id="total">{{ totalExpense.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { AppDB } from "../db-init.js";
export default {
  data: function() {
    return {
      userSelections: [],
      myExpense: [],
      totalExpense: 0,
      expenseDesc: "",
      expenseAmt: 0,
      expenseCat: "",
      expenseDate: "",
      expenseCategory: ["Food", "Gas","Education", "Clothing", "Other"]
    };
  },
  methods: {
    yourButtonHandler() {
      //alert(`You enter ${this.expenseAmt}`);
      AppDB.ref("budget")
        .push()
        .set({
          description: this.expenseDesc,
          amount: this.expenseAmt,
          date: this.expenseDate,
          category: this.expenseCat
        });
    },

    fbAddHandler(snapshot) {
      const item = snapshot.val();
      this.myExpense.push({ ...item, mykey: snapshot.key });
      // accumulate the total
      this.totalExpense += item.amount;
    },
    fbRemoveListener(snapshot) {
      /* snapshot.key will hold the key of the item being REMOVED */
      this.myExpense = this.myExpense.filter(z => z.mykey != snapshot.key);
    },
    selectionHandler(changeEvent) {
      // The ID of the checkbox is also the key of the record in Firebase
      const whichKey = changeEvent.target.id;
      if (changeEvent.target.checked) {
        this.userSelections.push(whichKey);
      } else {
        this.userSelections = this.userSelections.filter(id => id != whichKey);
      }
    },
    remove() {
      this.userSelections.forEach(victimKey => {
        AppDB.ref("budget")
          .child(victimKey)
          .remove();
      });
    }
  },
  mounted() {
    AppDB.ref("budget").on("child_added", this.fbAddHandler);
    AppDB.ref("budget").on("child_removed", this.fbRemoveListener);
  },
  beforeDestroy() {
    AppDB.ref("budget").off("child_added", this.fbAddHandler);
    AppDB.ref("budget").off("child_removed", this.fbRemoveListener);
  }
};
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
  grid-template-columns: auto;
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