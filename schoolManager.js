/*sm = new class{
    constructor(fun=()=>{}){
        this.schoolList=[];
        if(!thisPage.logged){
            //window.location = "../index.html";
        }
        fun()
    }
    create_school(schoolName) {
        log("creating school")
        var self=this;
        var fun = (data, status)=>{
            self.schoolList.push(data.schName);
        }
        thisPage.requestServer("/school/create",{'type':'school', 'name':schoolName},fun, 'json');
    }


}*/
SchoolManager={
    userSchoolList:[],
    allSchoolList:[],
    initialize:function(fun=()=>{}){
        if(!thisPage.logged){
            window.location = "../index.html";
        }
        fun()
    },
    create_school:function(schoolName, fun=function(){}) {
        log("creating school"+schoolName)
        var self=this;
        var func = (data, status)=>{
            if(data.status === 'success'){
                self.schoolList.push(data.data.School_Name);
            }
            else alert(data.status_message)
            log("called")
            fun()
        }
        thisPage.requestServer("/school/create",{'type':'school', 'name':schoolName},func, 'json');
    },
    refreshSchoolList:function(fun=function(){}){
        log("refreshing school list")
        var self=this
        var func=(data, status)=>{
            console.log(data, status)
            if(data.status === 'success'){
                for(i=0;i<data.data.user_schools.length;i++)
                {
                    self.userSchoolList.push({'id':data.data.user_schools[i].id, 'name':data.data.user_schools[i].name, 'address':data.data.user_schools[i].address, 'details':data.data.user_schools[i].details})
                    //self.allSchoolList.push({'id':data.data.all_schools[i].id, 'name':data.data[i].name, 'address':data.data[i].address, 'details':data.data[i].details})
                }
                for(i=0;i<data.data.all_schools.length;i++)
                {
                    //self.userSchoolList.push({'id':data.data.user_schools[i].id, 'name':data.data[i].name, 'address':data.data[i].address, 'details':data.data[i].details})
                    self.allSchoolList.push({'id':data.data.all_schools[i].id, 'name':data.data.all_schools[i].name, 'address':data.data.all_schools[i].address, 'details':data.data.all_schools[i].details})
                }
            }
            fun()
        }
        thisPage.requestServer('/school/getlist', {'type':'school', 'kind':'both'}, func, 'json')
    }
}
function log(data){
    console.log("LOG : "+data);
}

        