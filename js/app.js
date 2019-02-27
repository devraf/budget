const app = {
  //selectors for starting balance input and the balance text
  startingBalanceInput: document.querySelector('[name="starting-balance"]'),
  beginningBalance: document.querySelector('.beginning-balance'),
  //inital update to starting balance text set by using the starting balance input
  setBeginningBalance: () => {
    app.startingBalanceInput.addEventListener('change', () => {
      let x = ''
      if(app.startingBalanceInput.value === '') {
        app.beginningBalance.innerText = '0.00'
      } else
      x = parseFloat(app.startingBalanceInput.value).toFixed(2)
      app.beginningBalance.innerText = x
      //this should run if the user changes the balance and there is a debt list
      if(app.debtItemList.length >= 1) {
        app.updateCurrentBalance()
      }
    })
  },
  // selectors for the debt name and amount and add debt button
  debtNameInput: document.querySelector('[name="debt-name"]'),
  debtAmountInput: document.querySelector('[name="debt-amount"]'),
  addDebtItemButton: document.querySelector('[name="add-debt-item"]'),
  //array for debt name and amount in an object
  debtItemList:[],
  //this does a lot and may need to be broken down


  // inital use is to add debt name and amount to debt item list in object form
  addDebtItemToList: () => {
    app.addDebtItemButton.addEventListener('click', () => {
      let tempList = {
        debtName: app.debtNameInput.value,
        debtAmount: app.debtAmountInput.value,
        debtId: Math.random()
      }
      app.debtItemList.unshift(tempList)
      //functions that run in conjunction with this click eventListener
      app.addDebtItemElements()
      // app.addLiElementToDebtNameFigure()
      // app.addLiElementToDebtAmountFigure()
      app.totalDebtAmount()
      app.updateCurrentBalance()
    })
  },
  //used to keep track of tatal debt amount
    //TODO may need to update naming for better readability
  totalDebt: 0,
  //loops through the debt item list array to update the total debt amount
  totalDebtAmount: () => {
    // (app.debtItemList.length >= 1)
      app.totalDebt = 0
      app.debtItemList.forEach(item => {
        app.totalDebt += parseFloat(item.debtAmount)
      })

      app.totalExpense()
      app.expenseCount()
  },
  //updates the text for expense total
  totalExpense: () => {
    let totalExp = document.querySelector('.total-expense')
    totalExp.innerText = app.totalDebt.toFixed(2)
  },
  expenseCount: () => {
    let count = document.querySelector('.expense-count')
    count.innerText = app.debtItemList.length.toString()
  },
  //used to keep track of the remaining balance the user sees
  currentBalance: 0,
  //this updates the beginning balance html section when debt items are added
  //used when user adds a debt item
  updateCurrentBalance: () => {
    app.currentBalance = parseFloat(app.startingBalanceInput.value)
    app.currentBalance -= app.totalDebt
    app.beginningBalance.innerText = app.currentBalance.toFixed(2)
  },
  //view section this adds the html tags and text for debt item name
  debtlistNameFigure: document.querySelector('.debt-list-name'),
  addLiElementToDebtNameFigure: () => {
    let liElement = document.createElement('li')
    let liNewDebtNameText = document.createTextNode(app.debtItemList[0].debtName)
    liElement.appendChild(liNewDebtNameText)
    app.debtlistNameFigure.children[1].prepend(liElement)
  },
  //view section this add the html tags and amount for the debt item amount
  debtListAmountFigure: document.querySelector('.debt-list-amount'),
  addLiElementToDebtAmountFigure: () => {
    let liElement = document.createElement('li')
    let liNewDebtAmountText = document.createTextNode(app.debtItemList[0].debtAmount)
    liElement.appendChild(liNewDebtAmountText)
    app.debtListAmountFigure.children[1].prepend(liElement)
  },
  //New View section thats adds debt name / name input / amount / amount input / edit delete buttons

  //starts the app on page load
  init: () => {
    app.setBeginningBalance()
    app.addDebtItemToList()
    app.removeDebtItem()
  },
  debtListItemFigure: document.querySelector('.debt-list-section'),
  addDebtItemElements: () => {
    //create and add li element to ul
      //add debt-list-item class to li element
    let liElement = document.createElement('li')
    liElement.classList.add('debt-list-item')

    //add id to li with data attribute
    let dataAttr = document.createAttribute('data-id')
    dataAttr.value = app.debtItemList[0].debtId

    liElement.setAttributeNode(dataAttr)

    let ulElement = app.debtListItemFigure.children[1]
    ulElement.prepend(liElement)

    //unique ID to li


    //DEBT LIST ITEM NAME
    //add span element to li
      //add class to span element
    let justMadeLi = document.querySelector('.debt-list-item')
    let spanNameElement = document.createElement('span')
    spanNameElement.classList.add('debt-list-item-name')

    //create debt name text from debt list
    //add text to span
    let debtNameText = document.createTextNode(app.debtItemList[0].debtName)
    spanNameElement.appendChild(debtNameText)

    //add span to new li
    justMadeLi.appendChild(spanNameElement)
    //TODO add input after text name to edit text name

    //add debt amount
    let debtAmountElement = document.createElement('span')
    let debtAmountText = document.createTextNode(app.debtItemList[0].debtAmount)
    debtAmountElement.classList.add('debt-list-item-amount')
    debtAmountElement.appendChild(debtAmountText)
    justMadeLi.appendChild(debtAmountElement)

    //add delete button and class
    let deleteButton = document.createElement('button')
    let deleteButtonText = document.createTextNode('X')
    deleteButton.classList.add('delete-debt-item-button')
    deleteButton.appendChild(deleteButtonText)
    justMadeLi.appendChild(deleteButton)
  },
  removeDebtItem: () => {
    let debtList = document.querySelector('.debt-list')
    console.log(debtList)
    debtList.addEventListener('click', (event) => {
      if(event.target.localName === 'button') {
        let debtItemId = event.target.parentNode.dataset.id
        //console.log(debtItemId)
        for(let i = 0; i < app.debtItemList.length; i++) {
          if(debtItemId == app.debtItemList[i].debtId) {
            console.log(app.debtItemList.length)
            app.debtItemList.splice(i, 1)
            event.target.parentNode.remove()
            app.totalDebtAmount()
            app.updateCurrentBalance()
            console.log(app.debtItemList.length)
          }
        }
      }
    })
  }
  //TODO
    //update the current balance when user deletes a debt item
    //add the option to update a debt item on the list
    //add $ signs to each html element containing money Amount
    //add .00 to the balance
    //add total number of debts the user has added
}

app.init()
