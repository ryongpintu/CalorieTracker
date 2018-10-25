//Storage Controller

// Item Controller

const ItemCtrl=(function(){
  //Item Constructor

  const Item =function(id,name,calories){
    this.id=id;
    this.name=name;
    this.calories=calories;
  }

  // Data Structure / State

  const data={
    items:[
       ],
    currentItem:null,
    totalCalories:0
  }

  //Public methods
  return{

    getItems:function(){
      return data.items;
    },
    addItemToList:function(name,calories){
      let ID;
      
      if(data.items.length>0){
        ID=data.items[(data.items.length)-1].id+1;
      }else{
        ID=0;
      }
      calories=parseInt(calories);
      console.log(calories)
      const item=new Item(ID,name,calories);
      data.items.push(item);
      console.log(item)
      return item;
    },
    getTotalCalories:function(){
      let total=0;
      data.items.forEach(item=>{

          total += item.calories;
          
      })
     
      data.totalCalories=total;
      return total;
    },
    getFieldValue:function(id){

      console.log('inside getField:'+id)
      let itemData;
      itemData= data.items.find(item=>item.id===parseInt(id))
      // data.items.forEach(item=>{
      //   console.log('inside getField:foreach'+item.id)
      //   if(item.id===parseInt(id)){
          
      //     itemData=item;
      //     console.log(itemData)
      //   }
      // });
     console.log('test :',itemData);
      return itemData;
      
    },
    updateData:function(id,name,calories){
      let itemData;
      data.items.forEach(item=>{
        
        if(item.id===parseInt(id)){
          item.name=name;
          item.calories=parseInt(calories);
          item.id=parseInt(id);
          itemData=item;
        }
      });
      return itemData;
    },
    logData:function(){
      return data;
    }
  }

})();

//UI Controller
const UICtrl=(function(){
  // UI selector
  const UISelector={
    itemList:'#item-list',
    addBtn:'.add-btn',
    itemInput:'#item-name',
    itemCalories:'#item-calories',
    totalCalories:'.total-calories'
  }

  //Public methods
  return{
    populateItemList:function(items){
      let html='';

      items.forEach(item => {
        html +=`<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`
        
      });
      
      // insert list item
      document.querySelector(UISelector.itemList).innerHTML=html;
    },
    showTotalCalories:function(calories){
      document.querySelector(UISelector.totalCalories).textContent=calories;

    },
    getInput:function(){
      return{
        name:document.querySelector(UISelector.itemInput).value,
       calories:document.querySelector(UISelector.itemCalories).value
      
      }
      
    },
    addItem:function(item){
      // create li element
      const li = document.createElement('li');
      li.id=`item-${item.id}`;
      li.className='collection-item';
      li.innerHTML=`<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`

      document.querySelector(UISelector.itemList).insertAdjacentElement('beforeend',li);

      document.querySelector(UISelector.itemInput).value='';
      document.querySelector(UISelector.itemCalories).value='';
      
    },

    fillInputField:function(item){
      document.querySelector(UISelector.itemInput).value=item.name;
      document.querySelector(UISelector.itemCalories).value=item.calories;
      document.querySelector(UISelector.addBtn).textContent='Update Meal'
      // document.querySelector(UISelector.addBtn).style.color='red';

    },
    updateItem:function(updatedItem){
      document.querySelector(UISelector.itemInput).value='';
      document.querySelector(UISelector.itemCalories).value='';
      document.querySelector(UISelector.addBtn).textContent='Add Meal';
      document.querySelector(`#item-${updatedItem.id}`).innerHTML=`<strong>${updatedItem.name}: </strong> <em>${updatedItem.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`
    },

    getSelector:function(){
      return UISelector;
    }
  }
})();


// App

const App=(function(ItemCtrl,UICtrl){
    let id=0;
    
   //Load EventLoader Class
   const loadEventListener=function(){
     const UISelectors=UICtrl.getSelector();

     document.querySelector('.add-btn').addEventListener('click',itemAdd);

     document.querySelector('#item-list').addEventListener('click',editItem);
   }


   function itemAdd(e){
    
    if( e.target.textContent === "Add Meal"){
      
      const data= UICtrl.getInput();
     
      if(data.name !=='' & data.calories!==''){
        const item=ItemCtrl.addItemToList(data.name,data.calories);
        
        const totalCalories=ItemCtrl.getTotalCalories();
        UICtrl.showTotalCalories(totalCalories);
        UICtrl.addItem(item);
        
      }
      
    }else 
    
    {
      
      if(e.target.textContent==='Update Meal'){
        
      const item= UICtrl.getInput();
      console.log(id,item)
       const updatedItem=ItemCtrl.updateData(id,item.name,item.calories);
        console.log(updatedItem);
        const totalCalories=ItemCtrl.getTotalCalories();
        UICtrl.showTotalCalories(totalCalories);
        UICtrl.updateItem(updatedItem);
        
    }
  }

    e.preventDefault();
   }

   function editItem(e){

    if(e.target.classList.contains('edit-item')){
      
      id=(e.target.parentElement.parentElement.id).replace('item-','')
      console.log(id)
      const data= ItemCtrl.getFieldValue(id)
      UICtrl.fillInputField(data);
      // let idExists = editId();

      
    }

    e.preventDefault();
   }

    // function editId(id) {
    //   return function() {
    //     return id;
    //   }
    // }

  // Public Methods
  return{
    init:function(){
      //fetch data
      const items=ItemCtrl.getItems();

      //Popolate UI
      UICtrl.populateItemList(items);
      const totalCalories=ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);
      //load EventListener
      loadEventListener();
    }
  }
})(ItemCtrl,UICtrl);

// Initialize App.
App.init()