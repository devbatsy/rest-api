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
        nameTag:'countryElem',
        style:{
            height:'250px',
            width:'200px',
            cursor:'pointer',
            overflow:'hidden'
        }
    },
    {
        nameTag:'flag',
        style:{
            height:'50%',
            width:'100%',
            backgroundSize:'cover'
        }
    }
])

sydDOM.countryPage = () =>{
    const countries = () =>{
        let array = new Array();
        for(let i = 0;i < 1; i++){
            array.push(
                sydDOM.countryElement()
            )
        }
        return array;
    }
    return createElement(
        'div',
        {
            style:styleComponent.mainPageParent([{method:'use',style:['padding','height','width']}])+styleComponent.Fl([
                {method:'use',style:['display','justifyContent']},
                {method:'add',style:{flexWrap:'wrap',columnGap:'30px',rowGap:'30px',overflow:'scroll'}}
            ])
        },
        [
            ...preState(['countryPage','country'],countries())
        ],
        {
            createState:{
                stateName:'countryPage',
                state:{country:countries(),childbg:'#fff',reg:'africa'}
            },
            type:'countryPage'
        }
    )
}

sydDOM.countryElement = (countryName = '') =>{
    prevPage = (countryName) =>{
        const CmainPage = getState('mainPage_parent');
        const CprevPage = getState('previewMain');
        const Csec1 = getState('sec1');
        const Csec2 = getState('sec2');
        const Cborders = getState('borders')
        const CtextICountName = getState('textICountName')
        const Cflag = getState('previewFlag')
        CmainPage.op = '0';
        CmainPage.z = '9';
        CprevPage.op = '1';
        CprevPage.z = '10';
        for(let [x,y] of Object.entries(serverData))
        {
            if(y.name == countryName)
            {
                Cflag.img = y.flags.svg;
                Csec1.Nname = y.nativeName;
                Csec1.pop = breakPopulace(`${y.population}`);
                Csec1.reg = y.region;
                Csec1.Sreg = y.subregion;
                Csec1.cap = y.capital
                CtextICountName.name = y.name

                const refineIterable = (array) =>{
                    let textCont = ''
                    switch(true)
                    {
                        case array !== undefined:
                            for(let[x,y] of Object.entries(array))
                            {
                                textCont += `${y.name}`
                                if(array[Number(x)+1] !== undefined) textCont += ' , '
                            }
                    }
                    return textCont
                }
                Csec2.topL = y.topLevelDomain[0];
                Csec2.curr = refineIterable(y.currencies)
                Csec2.lang = refineIterable(y.languages)

                switch(true)
                {
                    case y.borders !== undefined:
                        Cborders.coun = []
                        y.borders.forEach(val =>{
                            for(let[x,param] of Object.entries(serverData)){
                                if(param.alpha3Code === val)
                                {
                                    Cborders.coun.push(param.name)
                                }   
                            }
                        })
                    break;
                    default:
                        console.log('no border was found')
                }
            }
        }
        useState('sec1',{type:'a',value:Csec1})
        useState('sec2',{type:'a',value:Csec2})
        useState('previewFlag',{type:'a',value:Cflag})
        useState('mainPage_parent',{type:'a',value:CmainPage})
        useState('previewMain',{type:'a',value:CprevPage})
        useState('borders',{type:'a',value:Cborders})
        useState('textICountName',{type:'a',value:CtextICountName})
    }
    return createElement(
        'div',
        {
            style:styleComponent.Fl([{method:'use',style:['display']},{method:'add',style:{flexDirection:'column',rowGap:'10px',background:preState(['countryPage','childbg'],'hsl(0, 0%, 100%)')}}])+styleComponent.countryElem()+styleComponent.mainPageInput({method:'use',style:['boxShadow','borderRadius']}),
            class:'country',
            onclick:`prevPage("${countryName}")`
        },
        [
            sydDOM.flag(),
            sydDOM.docs()
        ]
    )
}

sydDOM.flag = () =>{
    return createElement(
        'span',
        {
            style:styleComponent.bg([{method:'use',style:['backgroundRepeat','backgroundPosition']},{method:'add',style:{backgroundImage:'url(./img/null.svg)'}}])+styleComponent.flag()
        }
    )
}

sydDOM.docs = (Cname = 'Xxxxxx',pop = '---------',reg = 'Xxxxxx',cap = 'Xxxxxx') =>{
    return createElement(
        'div',
        {
            style:'height:50%;width:100%;flex-direction:column;row-gap:5px;padding:5px 15px;overflow:scroll;'+styleComponent.Fl({method:'use',style:['display']})
        },
        [
            sydDOM.info(Cname,pop,reg,cap)
        ]
    )
}
sydDOM.info = (Cname,pop,reg,cap) =>{
    return createElement(
        'div',
        {
            style:styleComponent.Fl([{method:'use',style:['display']},{method:'add',style:{flexDirection:'column',rowGap:'10px',fontSize:'13px',}}])
        },
        [
            createElement('p',{style:'font-weight:800;margin-bottom:5px;text-transform:capitalize'},[Cname]),
            createElement('span',{style:styleComponent.Fl({method:'use',style:['display']})+'column-gap:5px'},[
                createElement('p',{style:'font-weight:600;text-transform:capitalize'},['population:']),
                pop
            ]),
            createElement('span',{style:styleComponent.Fl({method:'use',style:['display']})+'column-gap:5px'},[
                createElement('p',{style:'font-weight:600;text-transform:capitalize;'},['region:']),
                reg
            ]),
            createElement('span',{style:styleComponent.Fl({method:'use',style:['display']})+'column-gap:5px'},[
                createElement('p',{style:'font-weight:600;text-transform:capitalize;'},['capital:']),
                cap
            ])
        ]
    )
}