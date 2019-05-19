class sherl {
	constructor(){

	}  
	arrInfo : [
	{belief : '信　　仰：真相??', render : 'color:#7905C6'},
	{mtto : '座 右 铭：∮逻辑的旋律牵动现象，永远演奏者事实♪', render : 'color:#089898'},
	{author : '作　　者：leaffly',render : 'color:#030F05'},
	{describe : '描　　述：the game is on !!',render : 'color:#C4810A'},
	{email : '邮　　箱：sherlock@bakerstreet.club',render : 'color:#406239'},
	{flink : ['bakerstreet.club', 'sherlock.help', 'bakerstreet.top', 'gogoogle.top'], render : 'color:#898321'	},
	{version : 'v1.0.0.20180930',render : 'color:#AA2E29'},
	{adorn : '❉ ',render : 'font-size:16pt'}],
	show(){
		this.arrInfo.forEach(item => {
			let {msg, render} = item;
			console.log(`%c${msg}`, render);
		});
	}
}

export default sherl;