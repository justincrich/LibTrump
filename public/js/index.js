window.onload =()=>{

  //listen for click
  document.getElementById('submitButton').addEventListener('click',(e)=>{
    var qForm = Object.values(document.forms['questionForm'].elements);
    //console.log(Object.values(qForm));
    let totLength = 0;
    qForm.forEach(element=>{
      if(element.value.length){
        totLength++;
      }
    });

    if(totLength>0){
      console.log('fields have length');
    }else{
      console.log('no fields filled');
    }

  });
}
