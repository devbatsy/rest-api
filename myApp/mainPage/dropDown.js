import {
    sydDOM,
	setStyle,
	styleComponent,
	mount,
	createElement,
	preState,
    getState,
    useState
} from '../sydneyDom.js'

setStyle([
    {
        nameTag:'drc',
        style:{
            width:'100%',
            height:'fit-content',
            position:'absolute',
            top:'110%',
            left:'0',
            background:'inherit',
            padding:'10px 10px',
            zIndex:'300',
            transition:'all linear .3s',
            maxHeight:'200px',
            overflow:'scroll'
        }
    }
])

sydDOM.searchDropDown = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.Fl([{method:'add',style:{paddingRight:'15px',position:'relative',transition:'all linear .2s',zIndex:'300',background:preState(['searchDropDown','bg'],'hsl(0, 0%, 100%)')}}])+styleComponent.mainPageInput({method:'remove',style:['maxWidth','width','columnGap']}),
        },
        [
            createElement(
                'div',
                {
                    style:styleComponent.Fl([{method:'use',style:['display','alignItems']},{method:'add',style:{columnGap:'70px',width:'fit-content',cursor:'pointer',position:'relative',height:'100%',background:'transparent'}}]),
                },
                [
                    "Filter by Region",
                    createElement('span',{style:`background-image:url(./img/${preState(['searchDropDown','bg'],'hsl(0, 0%, 100%)') === 'hsl(0, 0%, 100%)' ? 'drop':'drop-w'}.svg);height:20px;width:20px;`+styleComponent.bg()}),
                    sydDOM.mainPageFocusInput()
                ]
            ),
            sydDOM.dropCont()
        ],
        {
            createState:{
                stateName:'searchDropDown',
                state:{bg:'hsl(0, 0%, 100%)'}
            },
            type:'searchDropDown'
        }
    )
}

sydDOM.mainPageFocusInput = () =>{
    filterDrop = (param) =>{
        let stateName = ''
        switch(true)
        {
            case param === 'filter':
                stateName = 'dropCont';
            break;
            default:
                stateName = 'searchBD'
        }
        const Csearch = getState(stateName);
        Csearch.d = 'flex';
        useState(stateName,{type:'a',value:Csearch})
        let timer = setTimeout(() =>{
            Csearch.t = 'translateY(0px)';
            Csearch.op = '1';
            useState(stateName,{type:'a',value:Csearch})
            clearTimeout(timer)
        },20)
    }
    filterUp = (param) =>{
        let stateName = ''
        switch(true)
        {
            case param === 'filter':
                stateName = 'dropCont';
            break;
            default:
                stateName = 'searchBD'
        }
        const Csearch = getState(stateName);
        let ptimer = setTimeout(() =>{
            Csearch.op = '0';
            useState(stateName,{type:'a',value:Csearch})
            let timer2 = setTimeout(() =>{
                Csearch.d = 'none';
                clearTimeout(timer2);
                useState(stateName,{type:'a',value:Csearch})
            },300)
            clearTimeout(ptimer)
        },20)
    }
    return createElement(
        'input',
        {
            style:'position:absolute;height:100%;width:100%;opacity:0;cursor:inherit;',
            onfocus:'filterDrop("filter")',
            onblur:'filterUp("filter")',
            readonly:'readonly'
        }
    )
}

sydDOM.dropCont = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.drc()+styleComponent.mainPageInput({method:'use',style:['boxShadow','paddingLeft','borderRadius']})+styleComponent.Fl([{method:'add',style:{flexDirection:'column',justifyContent:'flex-start',rowGap:'5px',display:preState(['dropCont','d'],'none'),opacity:preState(['dropCont','op'],'0')}}]),
        },
        [//transform:preState(['dropCont','t'],'translateY(-50px)')
            sydDOM.dropClick().addChild({element:"africa"}).addAttr({onclick:'updateCountry("africa")'}),
            sydDOM.dropClick().addChild({element:"americas"}).addAttr({onclick:'updateCountry("americas")'}),
            sydDOM.dropClick().addChild({element:"asia"}).addAttr({onclick:'updateCountry("asia")'}),
            sydDOM.dropClick().addChild({element:"europe"}).addAttr({onclick:'updateCountry("europe")'}),
            sydDOM.dropClick().addChild({element:"oceania"}).addAttr({onclick:'updateCountry("oceania")'}),
            sydDOM.dropClick().addChild({element:"polar"}).addAttr({onclick:'updateCountry("polar")'}),
            sydDOM.dropClick().addChild({element:"antarctic ocean"}).addAttr({onclick:'updateCountry("antarctic ocean")'}),
        ],
        {
            createState:{
                stateName:'dropCont',
                state:{d:'none',op:'0',t:'translateY(-50px)'}
            },
            type:'dropCont'
        }
    )
}

sydDOM.dropClick = () =>{
    updateCountry = (region) =>{
        const CcountryPage = getState('countryPage')
        CcountryPage.reg = region;
        useState('countryPage',{type:'a',value:CcountryPage})
        updateState()
    }
    return createElement(
        'p',
        {
            style:'text-transform:capitalize;padding:8px 5px;width:100%;transition:all linear .2s;cursor:pointer',
            class:'drpClick'
        },
        []
    )
}