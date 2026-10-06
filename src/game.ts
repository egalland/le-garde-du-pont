export type Ending = 'paid'|'friend'|'riddle'|'fled'|'banned';
export type State = { version:1; node:string; coins:number; cheese:boolean; trust:number; anger:number; history:string[]; endings:Ending[] };
export type Choice = { id:string; label:string; hint:string; next:string; coins?:number; cheese?:boolean; trust?:number; anger?:number; cost?:number; needsCheese?:boolean; ending?:Ending };
export const endings:Record<Ending,{title:string;description:string;symbol:string}>={
paid:{title:'Le prix du passage',description:'Douze pièces changent de main. Vous traversez, la bourse vide. Derrière vous, l’ogre compte… puis recommence. Les nombres ne sont pas son fort.',symbol:'◈'},
friend:{title:'Un ami de l’autre côté',description:'Vous réparez la rambarde ensemble. « Reviens quand tu veux », marmonne Bröm. Le pont paraît soudain moins long.',symbol:'❋'},
riddle:{title:'La tête plutôt que la bourse',description:'« Une rivière ! » Bröm soupire, puis s’écarte. Un marché est un marché. Vous traversez avec votre or et un peu de sa considération.',symbol:'✧'},
fled:{title:'Le chemin des roseaux',description:'Vous choisissez de rebrousser chemin. Un sentier longe la rivière. Le détour prendra du temps, mais personne n’a été mangé. C’est déjà bien.',symbol:'≈'},
banned:{title:'Le pont reste fermé',description:'Le poing de Bröm s’abat sur la rambarde. « ASSEZ ! » Vous reculez avant que la discussion ne devienne un repas. Il faudra trouver un autre passage.',symbol:'✕'}
};
export const nodes:Record<string,{chapter:string;text:string;aside:string;choices:Choice[]}>= {
gate:{chapter:'La rencontre',text:'« Halte, petit voyageur. Mon pont, mes règles. Douze pièces pour passer… ou une bonne raison de ne pas te manger. »',aside:'L’ogre bloque le passage. Son ventre gronde plus fort que la rivière.',choices:[
{id:'listen',label:'Pourquoi gardes-tu ce pont ?',hint:'Écouter · confiance +1',next:'story',trust:1},
{id:'pay',label:'Payer les douze pièces',hint:'12 pièces · passage immédiat',next:'end',cost:12,coins:-12,ending:'paid'},
{id:'gift',label:'Proposer mon fromage',hint:'1 fromage · confiance +1',next:'gift',cheese:false,needsCheese:true,trust:1},
{id:'threat',label:'Laisse-moi passer, gros tas !',hint:'Provoquer · colère +1',next:'warning',anger:1}]},
story:{chapter:'Sous la carapace',text:'« Avant, les gens disaient bonjour. Maintenant, ils jettent des cailloux. Et cette rambarde… personne ne m’aide à la réparer. »',aside:'Pour la première fois, Bröm baisse les yeux. Le péage n’est peut-être pas son vrai problème.',choices:[
{id:'help',label:'Je peux t’aider à réparer',hint:'Coopérer · confiance +2',next:'repair',trust:2},
{id:'riddle',label:'Et si on jouait mon passage ?',hint:'Proposer une énigme',next:'riddle'},
{id:'bargain',label:'Six pièces, ça te va ?',hint:'Marchander · colère +1',next:'bargain',anger:1},
{id:'leave',label:'Je vais chercher un autre chemin',hint:'Partir sans danger',next:'end',ending:'fled'}]},
gift:{chapter:'Un nez pour les affaires',text:'« Ça sent… très fort. C’est parfait. Mais un fromage ne répare pas un pont. Tu sais faire autre chose que transporter le dîner ? »',aside:'Le fromage disparaît en une bouchée. La conversation devient presque civilisée.',choices:[
{id:'help',label:'Je peux réparer la rambarde',hint:'Coopérer · confiance +2',next:'repair',trust:2},
{id:'riddle',label:'Je sais résoudre des énigmes',hint:'Tenter votre chance',next:'riddle'},
{id:'mock',label:'Tu peux bien travailler tout seul',hint:'Provoquer · colère +1',next:'warning',anger:1}]},
repair:{chapter:'Une planche, deux mains',text:'« Toi, tu tiens la planche. Moi, je frappe. Enfin… le clou. Pas toi. »',aside:'Une planche est remise en place. Bröm attend encore un petit geste de votre part.',choices:[
{id:'share',label:'Partager mon fromage après le travail',hint:'1 fromage · une amitié possible',next:'end',needsCheese:true,cheese:false,ending:'friend'},
{id:'thanks',label:'Merci de m’avoir fait confiance',hint:'Un geste sincère · une amitié possible',next:'end',ending:'friend'},
{id:'demand',label:'Bon, maintenant laisse-moi passer !',hint:'Exiger · colère +1',next:'warning',anger:1}]},
riddle:{chapter:'Le pari de Bröm',text:'« J’ai un lit, mais je ne dors jamais. Je cours, mais je n’ai pas de jambes. Qui suis-je ? Réponds juste, et tu passes. »',aside:'L’ogre sourit. Il aime beaucoup cette énigme. Il l’a inventée. Enfin, c’est ce qu’il dit.',choices:[
{id:'river',label:'Une rivière',hint:'Répondre',next:'end',ending:'riddle'},
{id:'wolf',label:'Un loup insomniaque',hint:'Répondre · risque de colère',next:'wrong',anger:1},
{id:'bed',label:'Un lit avec des roulettes',hint:'Répondre · risque de colère',next:'wrong',anger:1}]},
wrong:{chapter:'Une seconde chance',text:'« Non. Et je n’aime pas qu’on se moque de MON énigme. Écoute le bruit sous tes pieds, petit. »',aside:'Bröm vous donne un indice. Il reste une chance de sauver la discussion.',choices:[
{id:'river',label:'La rivière, bien sûr',hint:'Répondre à nouveau',next:'end',ending:'riddle'},
{id:'insult',label:'Ton énigme est stupide',hint:'Provoquer · colère +2',next:'warning',anger:2},
{id:'leave',label:'Je préfère partir',hint:'Choisir le détour',next:'end',ending:'fled'}]},
bargain:{chapter:'Le mauvais calcul',text:'« Six ? Le pont n’est pas à moitié long. Douze, ou trouve quelque chose de plus intéressant que tes pièces. »',aside:'Le prix ne baisse pas. Mais Bröm n’a pas encore rompu la négociation.',choices:[
{id:'pay',label:'D’accord, douze pièces',hint:'12 pièces · passage immédiat',next:'end',cost:12,coins:-12,ending:'paid'},
{id:'riddle',label:'Un pari sur une énigme ?',hint:'Changer d’approche',next:'riddle'},
{id:'threat',label:'Je passerai quand même',hint:'Provoquer · colère +1',next:'warning',anger:1}]},
warning:{chapter:'La patience a ses limites',text:'« Attention, petit. Les mots aussi peuvent finir dans la rivière. Tu veux recommencer ta phrase ? »',aside:'Ses doigts se crispent sur la rambarde. Une troisième colère ferme le pont.',choices:[
{id:'apologize',label:'Pardon. Je t’ai mal jugé',hint:'Apaiser · colère −1, confiance +1',next:'story',anger:-1,trust:1},
{id:'double',label:'Tu ne me fais pas peur',hint:'Provoquer · colère +1',next:'warning',anger:1},
{id:'leave',label:'Je m’en vais',hint:'Partir sans danger',next:'end',ending:'fled'}]}
};
export function initial(endings:Ending[]=[]):State{return {version:1,node:'gate',coins:12,cheese:true,trust:0,anger:0,history:[],endings};}
export function currentEnding(s:State):Ending|null{return s.node.startsWith('end:')?s.node.slice(4) as Ending:null;}
export function mood(s:State){return s.anger>=2?'Furieux':s.anger===1?'Méfiant':s.trust>=3?'Apaisé':s.trust>0?'Intrigué':'Méfiant';}
export function step(s:State,id:string):State{
const c=nodes[s.node]?.choices.find(c=>c.id===id);if(!c)throw new Error('Ce choix n’est pas disponible.');
if(c.cost&&s.coins<c.cost)throw new Error('Vous n’avez pas assez de pièces.');if(c.needsCheese&&!s.cheese)throw new Error('Vous n’avez plus de fromage.');
const n:State={...s,node:c.next,coins:s.coins+(c.coins??0),cheese:c.cheese??s.cheese,trust:Math.min(5,s.trust+(c.trust??0)),anger:Math.max(0,s.anger+(c.anger??0)),history:[...s.history.slice(-99),c.label]};
const end=n.anger>=3?'banned':c.ending;if(end){n.node='end:'+end;n.endings=[...new Set([...n.endings,end])];}return n;
}
export function validate(value:unknown):State{
if(!value||typeof value!=='object')throw new Error('Sauvegarde illisible.');const s=value as State;
if(s.version!==1||(!Object.prototype.hasOwnProperty.call(nodes,s.node)&&!Object.keys(endings).some(e=>s.node==='end:'+e))||!Number.isInteger(s.coins)||s.coins<0||s.coins>12||typeof s.cheese!=='boolean'||!Number.isInteger(s.trust)||s.trust<0||s.trust>5||!Number.isInteger(s.anger)||s.anger<0||s.anger>3||!Array.isArray(s.history)||s.history.length>100||s.history.some(x=>typeof x!=='string'||x.length>200)||!Array.isArray(s.endings)||s.endings.some(e=>!Object.prototype.hasOwnProperty.call(endings,e)))throw new Error('Cette sauvegarde n’est pas compatible avec le jeu.');
return s;
}
