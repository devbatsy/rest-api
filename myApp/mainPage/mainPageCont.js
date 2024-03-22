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

import {} from './countryPage.js';
import {} from './dropDown.js'

setStyle([
    {
        nameTag:'mainPageParent',
        style:{
            height:'100%',
            width:'100%',
            padding:'10px 0',
            position:'absolute',
            top:'0',
            left:'0',
            transition:'opacity linear .3s'
        }
    },
    {
        nameTag:'mainPageInput',
        style:{
            // padding:'10px',
            paddingLeft:'30px',
            boxShadow:'0 0 3px rgba(0,0,0,.7)',
            width:'100%',
            maxWidth:'400px',
            columnGap:'10px',
            borderRadius:'5px',
            height:'50px'
        }
    }
])

sydDOM.mainPage_parent = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.mainPageParent()+styleComponent.Fl([{method:'use',style:['display']},{method:'add',style:{flexDirection:'column',zIndex:preState(['mainPage_parent','z'],'10'),opacity:preState(['mainPage_parent','op'],'1')}}])+styleComponent.cont({method:'use',style:['rowGap']})
        },
        [
            sydDOM.searchParams(),
            sydDOM.countryPage()
        ],
        {
            createState:{
                stateName:'mainPage_parent',
                state:{op:'1',z:'10'}
            },
            type:'mainPage_parent'
        }
    )
}

sydDOM.mainPageInput = () =>{
    searchInputMatch = (elem) =>{
        const regSearch = new RegExp(`\^${elem.value}`);
        let matchedBool = false;
        const CsearchBD = getState('searchBD');
        CsearchBD.match = []
        switch(true)
        {
            case elem.value.length > 0:
                for(let [x,y] of Object.entries(serverData)){
                    if(regSearch.test(y.name.toLowerCase()))
                    {
                        matchedBool = true;
                        CsearchBD.match.push(
                            sydDOM.dropClick().addChild({element:y.name}).addAttr({onclick:`updateSingleCountry("${y.name}")`})
                        )
                    }
                }
        }
        useState('searchBD',{type:'a',value:CsearchBD})
        if(matchedBool) filterDrop("searchBD")
        else filterUp("searchBD")
    }

    updateSingleCountry = (name) =>{
        const Cs = getState('countryPage');
        Cs.country = []
        for(let [x,y] of Object.entries(serverData)){
            if(y.name == name)
            {
                Cs.country.push(
                    sydDOM.countryElement(y.name).replaceChild({position:0,element:sydDOM.flag().addAttr({
                        style:styleComponent.bg([{method:'use',style:['backgroundRepeat','backgroundPosition']},{method:'add',style:{backgroundImage:`url(${y.flags.svg})`}}])+styleComponent.flag()
                    })}).replaceChild({position:1,element:sydDOM.docs(y.name,breakPopulace(`${y.population}`),y.region,y.capital)})
                )
            }
        }
        useState('countryPage',{type:'a',value:Cs})
    }
    return createElement(
        'div',
        {
            style:styleComponent.Fl({method:'use',style:['display','alignItems']})+styleComponent.mainPageInput({method:'add',style:{background:preState(['mainPageInput','bg'],'hsl(0, 0%, 100%)'),position:'relative',color:'inherit'}})
        },
        [
            createElement('span',{style:`background-image:url(./img/${preState(['mainPageInput','bg'],'hsl(0, 0%, 100%)') === 'hsl(0, 0%, 100%)'?'search':'search-w'}.svg);height:20px;width:20px;`+styleComponent.bg({method:'add',style:{backgroundSize:'contain'}})}),
            createElement('input',{
            style:'height:30px;width:100%;border:none;outline:none;background:transparent;color:inherit',
            placeholder:'Search for a country...',
            onblur:'filterUp("searchBD")',
            oninput:'searchInputMatch(this)'
            }),
            sydDOM.searchBD()
        ],
        {
            createState:{
                stateName:'mainPageInput',
                state:{bg:'hsl(0, 0%, 100%)'}
            },
            type:'mainPageInput'
        }
    )
}

sydDOM.searchParams = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.Fl([
                {method:'use',style:['display','alignItems']},
                {method:'add',style:{justifyContent:'space-between',width:'100%',flexWrap:'wrap',padding:'5px 0',rowGap:'30px',columnGap:'50px',fontSize:'14px'}}
            ])
        },
        [
            sydDOM.mainPageInput(),
            sydDOM.searchDropDown(),
        ]
    )
}

sydDOM.searchBD = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.drc()+styleComponent.mainPageInput({method:'use',style:['boxShadow','paddingLeft','borderRadius']})+styleComponent.Fl([{method:'add',style:{flexDirection:'column',rowGap:'5px',justifyContent:'flex-start',zIndex:'350',display:preState(['searchBD','d'],'none'),opacity:preState(['searchBD','op'],'0')}}])
        },
        [
            ...preState(['searchBD','match'],[])
            // sydDOM.dropClick().addChild({element:"africa"}).addAttr({onclick:'updateCountry("africa")'}),
            // sydDOM.dropClick().addChild({element:"africa"}).addAttr({onclick:'updateCountry("africa")'}),
            // sydDOM.dropClick().addChild({element:"africa"}).addAttr({onclick:'updateCountry("africa")'}),
            // sydDOM.dropClick().addChild({element:"africa"}).addAttr({onclick:'updateCountry("africa")'})
        ],
        {
            createState:{
                stateName:'searchBD',
                state:{op:'0',d:'none',match:[]}
            },
            type:'searchBD'
        }
    )
}