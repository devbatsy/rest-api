import { 
	sydDOM,
	setStyle,
	styleComponent,
	mount,
	createElement,
	preState,
	getState,
	useState
} from "./sydneyDom.js";
import {} from './mainPage/mainPageCont.js';
import {} from './previewPage/preview.js'

serverData = {}

breakPopulace = (data) =>{
	let count = 1;
	let temporal = ''
	for(let i = data.length-1;i >= 0;i--)
	{
		temporal+=data[i];
		if(count === 3 && data[i-1] !== undefined)
		{
			temporal+=',';
			count = 0;
		}
		count++
	}
	return temporal.split('').reverse().join('');
}

updateState = () =>{
	const Cs = getState('countryPage');
	Cs.country = []
	for(let [x,y] of Object.entries(serverData)){
		if(y.region.toLowerCase() == Cs.reg)
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

const fetchData = () =>{
	const getData = new XMLHttpRequest()

	getData.open('get','data/data.json',true);
	
	getData.send();
	
	getData.addEventListener('load',e =>{
		switch(true)
		{
			case e.target.readyState === 4 && e.target.status === 200:
				Object.assign(serverData,JSON.parse(e.target.responseText))
				updateState()
		}
	})
}
fetchData()

setStyle([
	{
		nameTag:'cont',
		style:{
			height:'100vh',
			minHeight:'100vh',
			width:'100vw',
			position:'relative',
			rowGap:'30px',
			fontFamily:'ubuntu'
		}
	},
	{
		nameTag:'Fl',
		style:{
			display:'flex',
			justifyContent:"center",
			alignItems:'center'
		}
	},
	{
		nameTag:'bg',
		style:{
			backgroundSize:'cover',
			backgroundRepeat:'no-repeat',
			backgroundPosition:'center'
		}
	},
	{
        nameTag:'switchPage',
        style:{
            height:'calc(100% - 100px)',
            minHeight:'calc(100% - 100px)',
            width:'90%',
			position:'relative'
        }
    }
])


sydDOM.container = () =>{
	return createElement(
		'div',
		{
			style:styleComponent.cont()+styleComponent.Fl({method:'add',style:{flexDirection:'column',background:preState(['container','bg'],'hsl(0, 0%, 98%)'),color:preState(['container','cl'],'hsl(200, 15%, 8%)'),justifyContent:'flex-start'}})
		},
		[
			sydDOM.floatTop(),
			createElement(
				'div',
				{
					style:styleComponent.switchPage()
				},
				[
					sydDOM.mainPage_parent(),
					sydDOM.previewMain()
				]
			),
		],
		{
			createState:{
				stateName:'container',
				state:{bg:'hsl(0, 0%, 98%)',cl:'#000'}
			},
			type:'container'
		}
	)
}

sydDOM.floatTop = () =>{
	return createElement(
		'div',
		{
			style:styleComponent.Fl([
				{method:'use',style:['display','alignItems']},
				{method:'add',style:{
					justifyContent:'space-between',
					padding:'0 30px',
					height:'50px',
					background:preState(['floatTop','bg'],'hsl(0, 0%, 100%)'),
					boxShadow:'0 0 3px rgba(0,0,0,.7)',
					width:'100%',
				}}
			])
		},
		[
			createElement('p',{style:'font-weight:800;font-size:17px'},["Where in the world?"]),
			sydDOM.drkModeIcon()
		],
		{
			createState:{
				stateName:'floatTop',
				state:{bg:'hsl(0, 0%, 100%)'}
			},
			type:'floatTop'
		}
	)
}

sydDOM.drkModeIcon = () =>{
	drkMd = () =>{
		const Cfloat = getState('floatTop');//
		const CMinput = getState('mainPageInput');
		const Ccont = getState('container');
		const CsearchParam = getState('searchDropDown');
		const Ccountry = getState('countryPage');
		const Cback = getState('backButton');
		const Cborders = getState('borders')
		if(preState(['drkModeIcon']))
		{
			Cfloat.bg = 'hsl(209, 23%, 22%)'
			CMinput.bg = 'hsl(209, 23%, 22%)'
			CsearchParam.bg = 'hsl(209, 23%, 22%)'
			Ccountry.childbg = 'hsl(209, 23%, 22%)'
			Cborders.bg = 'hsl(209, 23%, 22%)'
			Cback.bg = 'hsl(209, 23%, 22%)' 
			Ccont.bg = 'hsl(207, 26%, 17%)'
			Ccont.cl = '#fff'
		}else{
			Cfloat.bg = 'hsl(0, 0%, 100%)'
			CMinput.bg = 'hsl(0, 0%, 100%)'
			CsearchParam.bg = 'hsl(0, 0%, 100%)'
			Ccountry.childbg = 'hsl(0, 0%, 100%)'
			Cback.bg = 'hsl(0, 0%, 100%)'
			Cborders.bg = 'hsl(0, 0%, 100%)'
			Ccont.bg = 'hsl(0, 0%, 98%)'
			Ccont.cl = 'hsl(200, 15%, 8%)'
		}
		useState('container',{type:'a',value:Ccont})
		useState('floatTop',{type:'a',value:Cfloat})
		useState('mainPageInput',{type:'a',value:CMinput})
		useState('searchDropDown',{type:'a',value:CsearchParam})
		useState('countryPage',{type:'a',value:Ccountry})
		useState('backButton',{type:'a',value:Cback})
		useState('borders',{type:'a',value:Cborders})
		updateState()
		useState('drkModeIcon')
	}
	const text = () =>{return preState(['drkModeIcon'],false) === true ? 'Light Mode' : 'Dark Mode'}
	return createElement(
		'div',
		{
			style:styleComponent.Fl([{method:'use',style:['display','alignItems']},{method:'add',style:{columnGap:'10px',cursor:'pointer',userSelect:'none',padding:'10px'}}]),
			onclick:'drkMd()'
		},
		[
			createElement('span',{style:`background-image:url(./img/${preState(['drkModeIcon'],false) === false ? 'moon' : 'moon-w'}.svg);height:25px;width:25px;`+styleComponent.bg()}),
			text()
		],
		{
			createState:{
				stateName:'drkModeIcon',
				tenary:true,
				tenaryOptions:[false,true]
			},
			type:'drkModeIcon'
		}
	)
}


mount(sydDOM.container())