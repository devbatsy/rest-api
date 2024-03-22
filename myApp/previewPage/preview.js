import { 
	sydDOM,
	setStyle,
	styleComponent,
	mount,
	createElement,
	preState,
	getState,
	useState
} from "../sydneyDom.js";

sydDOM.previewMain = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.mainPageParent()+styleComponent.Fl([{method:'use',style:['display']},{method:'add',style:{flexDirection:'column',zIndex:preState(['previewMain','z'],'9'),opacity:preState(['previewMain','op'],'0')}}])+styleComponent.cont({method:'use',style:['rowGap']})
        },
        [
            sydDOM.backButton(),
            sydDOM.mainInfo()
        ],
        {
            createState:{
                stateName:'previewMain',
                state:{op:'0',z:'9'}
            },
            type:'previewMain'
        }
    )
}

sydDOM.backButton = () =>{
    goback = () =>{
        const CmainPage = getState('mainPage_parent');
        const CprevPage = getState('previewMain');
        CmainPage.op = '1';
        CmainPage.z = '10';
        CprevPage.op = '0';
        CprevPage.z = '9';
        useState('mainPage_parent',{type:'a',value:CmainPage})
        useState('previewMain',{type:'a',value:CprevPage})
    }
    return createElement(
        'div',
        {
            style:styleComponent.mainPageInput([{method:'use',style:['boxShadow','columnGap','borderRadius']},{method:'add',style:{padding:'0 20px',cursor:'pointer',width:'fit-content',height:'40px',background:preState(['backButton','bg'],'hsl(0, 0%, 100%)')}}])+styleComponent.Fl({method:'use',style:['display','alignItems']}),
            onclick:'goback()',
            id:'dropCont'
        },
        [
            createElement('span',{style:`background-image:url(./img/${preState(['backButton','bg'],'hsl(0, 0%, 100%)') === 'hsl(0, 0%, 100%)' ? 'left' : 'left-w'}.svg);height:20px;width:20px;`+styleComponent.bg()}),
            "Back"
        ],
        {
            createState:{
                stateName:'backButton',
                state:'hsl(0, 0%, 100%)'
            },
            type:"backButton"
        }
    )
}

sydDOM.mainInfo = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.mainPageParent([{method:'use',style:['padding','height','width']}])+styleComponent.Fl([
                {method:'use',style:['display']},
                {method:'add',style:{flexWrap:'wrap',columnGap:'50px',rowGap:'20px',overflow:'scroll'}}
            ])
        },
        [
            sydDOM.previewFlag(),
            sydDOM.textInfo()
        ]
    )
}

sydDOM.previewFlag = () =>{
    return createElement(
        'div',
        {
            style:'height:280px;width:40%;min-width:280px;max-width:450px'+styleComponent.bg([{method:'use',style:['backgroundRepeat','backgroundPosition']},{method:'add',style:{backgroundImage:`url(${preState(['previewFlag','img'],'img/moon.svg')})`,boxShadow:'0 0 7px rgba(0,0,0,.7)'}}])+styleComponent.flag({method:'use',style:['backgroundSize']})
        },
        [],
        {
            createState:{
                stateName:'previewFlag',
                state:{img:'img/moon.svg'}
            },
            type:'previewFlag'
        }
    )
}

sydDOM.textInfo = () =>{
    return createElement(
        'div',
        {
            style:'height:fit-content;min-height:280px;width:50%;min-width:300px;padding:10px 10px;'+styleComponent.Fl([
                {method:'use',style:['display','justifyContent']},
                {method:'add',style:{flexDirection:'column',rowGap:'15px'}}
            ])
        },
        [
            sydDOM.textICountName(),
            createElement(
                'div',
                {
                    style:styleComponent.Fl([
                        {method:'use',style:['display','alignItems']},
                        {method:'add',style:{flexWrap:'wrap',columnGap:'10px',justifyContent:'space-between',rowGap:'50px'}}
                    ])
                },
                [
                    sydDOM.sec1(),
                    sydDOM.sec2()
                ]
            ),
            sydDOM.borders()
        ]
    )
}

sydDOM.textICountName = () =>{
    return createElement('p',{style:'font-weight:800;font-size:20px'},[preState(['textICountName','name'],'Xxxxxxxx')],{createState:{stateName:'textICountName',state:{name:'Xxxxxxxx'}},type:'textICountName'})
}

sydDOM.sec1 = () =>{
    return createElement(
        'div',
        {
            style:'width:fit-content;height:fit-content'
        },
        [
            sydDOM.infoPrev('Native name',preState(['sec1','Nname'],'Xxxxx')),
            sydDOM.infoPrev('population',preState(['sec1','pop'],'Xxxxx')),
            sydDOM.infoPrev('region',preState(['sec1','reg'],'Xxxxx')),
            sydDOM.infoPrev('sub region',preState(['sec1','Sreg'],'Xxxxx')),
            sydDOM.infoPrev('capital',preState(['sec1','cap'],'Xxxxx')),
        ],
        {
            createState:{
                stateName:'sec1',
                state:{Nname:'Xxxxx',pop:'Xxxxx',reg:'Xxxxx',Sreg:'Xxxxx',cap:'Xxxxx'}
            },
            type:'sec1'
        }
    )
}
sydDOM.sec2 = () =>{
    return createElement(
        'div',
        {
            style:'width:fit-content;height:fit-content'
        },
        [
            sydDOM.infoPrev('top level domain',preState(['sec2','topL'],'Xxxxx')),
            sydDOM.infoPrev('currencies',preState(['sec2','curr'],'Xxxxx')),
            sydDOM.infoPrev('languages',preState(['sec2','lang'],'Xxxxx')),
        ],
        {
            createState:{
                stateName:'sec2',
                state:{topL:'Xxxxx',curr:'Xxxxx',lang:'Xxxxx'}
            },
            type:'sec2'
        }
    )
}

sydDOM.infoPrev = (x,y) =>{
    return createElement(
        'span',
        {style:styleComponent.Fl({method:'use',style:['display']})+'column-gap:5px'},[
        createElement('p',{style:'font-weight:600;text-transform:capitalize;margin-bottom:10px'},[`${x}:`]),
        y
    ])
}

sydDOM.borders = () =>{
    borderFunc = (countryName) =>{
        goback();
        updateSingleCountry(countryName)
    }
    const renderBorderCountries = () =>{
        const array = new Array();
        preState(['borders','coun'],[]).forEach(val =>{
            array.push(
                createElement(
                    'div',
                    {
                        style:styleComponent.mainPageInput([{method:'use',style:['boxShadow','borderRadius']},{method:'add',style:{padding:'0 20px',cursor:'pointer',width:'fit-content',height:'30px',background:preState(['borders','bg'],'#fff')}}])+styleComponent.Fl({method:'use',style:['display','alignItems']}),
                        onclick:`borderFunc("${val}")`
                    },
                    [
                        val
                    ]
                )
            )
        })
        return array;
    }
    renderBorderCountries()
    return createElement(
        'div',
        {
            style:styleComponent.Fl({method:'use',style:['display','alignItems']})+'padding:10px 0;column-gap:8px;flex-wrap:wrap;row-gap:10px'
        },
        [
            createElement('p',{style:'margin-right:10px;'},["Border Countries:"]),
            ...renderBorderCountries()
        ],
        {
            createState:{
                stateName:'borders',
                state:{bg:'#fff',coun:[]}
            },
            type:'borders'
        }
    )
}