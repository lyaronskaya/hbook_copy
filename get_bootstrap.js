var nav={
    barstart:['<nav class="navbar navbar-expand-md bg-dark navbar-dark"><a class="navbar-brand" href="#">',
          //Brand Name
          '</a>'+
            '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#',
            //id
            '"><span class="navbar-toggler-icon"></span></button>'+
          '<div class="collapse navbar-collapse" id="',
          //id
          '">'+
        '<ul class="nav navbar-nav">',
        /*
            menu
        */
        '</ul><ul class="nav navbar-nav navbar-right ml-auto">',
        /*
            right menu
        */
        '</div></div></nav>'],
        getPureMenuItem:function(data){return '<li>'+data+'</li>';},
        getMenuItem:function(Name,Link="#"){
        //return '<li><a href="#"><span class="glyphicon glyphicon-log-in"></span>Login</a></li></ul>+';
            return '<li><a href="'+Link+'>'+Name+'</a></li>';
        },
        getActiveMenuItem:function(Name, Link="#"){
                return '<li class="active"><a href="'+Link+'">'+Name+'</a></li>';
            },
        getDropDownMenu:function(name,items){
            data='';
            for(i=0;i<items.length;i++){
                data+=items[i];
            }
            return '<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">'+name+'<span class="caret"></span></a>'+
                        '<ul class="dropdown-menu">'+data+'</ul></li>';
        },
        getDropDownItem:function(name,link="#"){
            return '<li class="dropdown-item"><a href="'+link+'">'+name+'</a></li>';
        },
        getDropDownRightMenu:function(name,items){
            data='';
            for(i=0;i<items.length;i++){
                data+=items[i];
            }
            return '<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">'+name+'<span class="caret"></span></a>'+
                        '<ul class="dropdown-menu dropdown-menu-right">'+data+'</ul></li>';
        },
        get:function(Name,Items,rightItems,id="navitem"){
            return this.barstart[0]+ 
                            Name+
                    this.barstart[1]+
                            id+
                    this.barstart[2]+
                            id+
                    this.barstart[3]+ 
                            Items+
                    this.barstart[4]+
                            rightItems+
                    this.barstart[5];
            
        },
        getIcon:function(name, size='16px'){
           
            return '<i class="fa fa-'+name+'" style="font-size:'+size+';"></i>';
            },  
};
var slider={
    data:[' <div id="','" class="carousel slide text-center" data-ride="carousel">'+
    '<!-- Indicators -->'+
    '<ol class="carousel-indicators">',/*
      '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>'+
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>*/
    '</ol>'+
    '<!-- Wrapper for slides -->'+
    '<div class="carousel-inner" role="listbox">',
      /*<div class="item active">
        <h4>"This company is the best. I am so happy with the result!"<br><span>Michael Roe, Vice President, Comment Box</span></h4>
      </div>
      <div class="item">
        <h4>"One word... WOW!!"<br><span>John Doe, Salesman, Rep Inc</span></h4>
      </div>
      <div class="item">
        <h4>"Could I... BE any more happy with this company?"<br><span>Chandler Bing, Actor, FriendsAlot</span></h4>
      </div>
    </div>*/
    '<!-- Left and right controls -->'+
    '<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">'+
      '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'+
      '<span class="sr-only">Previous</span>'+
    '</a>'+
    '<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span>'+
    '</a></div></div>'],
    getItem:function(data){
        return  '<div class="item">'+data+'</div>';
    },
    getActiveItem:function(data){
        return  '<div class="item active">'+data+'</div>';
    },

    get:function(items,id="mycrow"){
        var item1='', item2='';
        for(i=0;i<items.length;i++){
            item1+='<li data-target="#myCarousel" data-slide-to="'+i+'" class="active"></li>';
            item2+=items[i];
        }
        return this.data[0]+id+this.data[1]+item1+this.data[2]+item2+this.data[3];
                    
    }
    ,
    setId:function(id){
        this.data[0]+=id;
    },i:0,
    addItem:function(data){
        this.data[1]+='<li data-target="#myCarousel" data-slide-to="'+this.i+'" class="active"></li>';
        this.i++;
        this.data[2]+=data;
    },
    getAll:function(){
        return this.data[0]+this.data[1]+this.data[2]+this.data[3];
    }
},
thisPage={
    token:'',logged:false,
    initialize:function thisPage(doit=function(){}){
        var self=this;
        $.get('/get_val', function(data, status){
            if(status==="success"){
                self.token=data;
                self.check_login(doit);
            }
            else console.log(status+"Value not initialized"+data);
        });
    },
    requestServer:function(where,data={},fun=function(){}, retType='text'){
        var self=this;
        var v={};
        data.csrfmiddlewaretoken=this.token;
        $.post(where, data, function(data,status){
            v.data=data;
            v.status=status;
            fun(data,status);
        }, retType);
        return v;
    },
    check_login:function(doit=function(){}){
        var self=this;
        var assign=function(data,status){
            self.logged=(data==="1");
            if(data==="1"){
                self.getUsrDetails()
            }
            doit();
        }
        this.requestServer("/checklogin",{}, assign);
    },
    components:[],
    userDetails:{},
    getUsrDetails:function() {
        self=this
        this.requestServer('/usrinfo', {}, function(data,status) {
            $.get("https://www.googleapis.com/plus/v1/people/"+data.data.gid+"?key="+data.data.api, function(data,status) {
                self.userDetails=data
            }, 'json')
            self.userDetails.email = data.email
        }, 'json')
    }

};
class Button{
    
    constructor(Name="Submit"){
        this.id = thisPage.components.length
        thisPage.components.push(this)
        var button = document.createElement('button')
        button.id = this.id
        var textNode = document.createElement('span')
        textNode.innerHTML=Name
        button.appendChild(textNode)
        button.className = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored'
        componentHandler.upgradeElement(button)
        this.element = button
        this.textNode = textNode
    }
    setText(str){this.element.innerHTML = str}
    disabled(){this.element.disabled=true}
    enabled(){this.element.disabled=false}
}
class FabButton{
    constructor(){
        this.id = thisPage.components.length
        var button = document.createElement("button");
        button.id = this.id
        var ic = document.createElement("i")
        ic.className = "material-icons"
        button.className = "mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--accent"
        ic.innerHTML = "add"
        button.appendChild(ic)
        componentHandler.upgradeElement(button)
        this.element = button
        thisPage.components.push(this)
    }
    disabled(){this.element.disabled=true}
    enabled(){this.element.disabled=false}
}
class card{
    constructor(title="card", body="",foot="footer")
    {
        this.id = thisPage.components.length
        this.card = document.createElement('div');
        this.card.className = "mdl-card mdl-shadow--2dp";
        this.card.style.width = "100%"

        this.card_title = document.createElement('div');
        this.card_title.className = "mdl-card__title";
        this.title = document.createElement('h2');
        this.title.className = "mdl-card__title-text"
        this.card_title.appendChild(this.title)
        this.title.innerHTML = title

        this.body = document.createElement('div');
        this.body.className = "mdl-card__supporting-text"
        this.body.innerHTML=body

        this.foot = document.createElement('div');
        this.foot.className = "mdl-card__actions mdl-card--border"
        this.foot.innerHTML = foot

        this.card.appendChild(this.card_title)
        this.card.appendChild(this.body)
        this.card.appendChild(this.foot)

        componentHandler.upgradeElement(this.card)
        
        thisPage.components.push(this)

    }
}
class InputNumField{
    constructor(label="Number", onWrongInput="Wrong Input"){
        this.id = thisPage.components.length
        this.element = document.createElement('div')
        this.element.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
        
        this.input = document.createElement('input')
        this.input.className = "mdl-textfield__input"
        this.input.type = "text"
        this.input.pattern = "-?[0-9]*(\.[0-9]+)?"
        this.input.id = this.id+2

        this.label = document.createElement('label')
        this.label.className = "mdl-textfield__label"
        this.label.setAttribute("for", this.id+2)
        this.label.innerHTML = label

        this.span = document.createElement("span")
        this.span.className = "mdl-textfield__error"
        this.span.innerHTML = onWrongInput

        this.element.appendChild(this.input)
        this.element.appendChild(this.label)
        this.element.appendChild(this.span)

        
        componentHandler.upgradeElement(this.element)

        thisPage.components.push(this)
    }
    setText(str){this.element.innerHTML = "str"}
    disabled(){this.input.disabled=true}
    enabled(){this.input.disabled=false}
}
class InputTextField{
    constructor(label="Name"){
        this.id = thisPage.components.length
        thisPage.components.push(this)
        
        this.element = document.createElement('div')
        this.element.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
        
        this.input = document.createElement('input')
        this.input.className = "mdl-textfield__input"
        this.input.type = "text"
        this.input.id = this.id+2

        this.label = document.createElement('label')
        this.label.className = "mdl-textfield__label"
        this.label.setAttribute("for", this.id+2)
        this.label.innerHTML = label

        this.element.appendChild(this.input)
        this.element.appendChild(this.label)
            
        componentHandler.upgradeElement(this.element)

    }
    disabled(){this.input.disabled=true}
    enabled(){this.input.disabled=false}
}
