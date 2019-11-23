#! /usr/bin/env node
//above line makes it global npm install -g flag
//axios is used to perform https requests
const axios = require('axios');
//yargs is used to interact with the commandline
const argv = require('yargs').usage("Usage: define -w [list of words]")
							.demandOption(['w'])
							.argv;
//chalk is used to add cmd line colors
const chalk = require('chalk');
//boxen is used to add cmd line borders
const boxen = require('boxen');
//https is used to bypass certificate issue while connecting to API
const https = require('https');
//to bypass certificate issue
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

axios.get(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${argv.w}?key=8d0cc3de-fc56-4ba4-90b7-202045e2b24c`,{ httpsAgent })
	.then((response) => {
		if(response.status === 200){
			
			console.log(typeof(argv.w) + "  " + typeof(response.data[0].meta.id));
			for(let count=0;count<response.data.length;count++){
				if(response.data[count].meta.id == argv.w){
					console.log(boxen(`${chalk.bold.yellow(response.data[count].fl.toUpperCase())}: `,{padding: 1, margin: 1, borderStyle: 'double'}));
					for(let def_count=0;def_count<response.data[count].def.length;def_count++){
						for(let sseq_count=0;sseq_count<response.data[count].def[def_count].sseq.length;sseq_count++){
							console.log(`\n${chalk.bold.yellow(sseq_count +1)}` + chalk.bold.yellow(')') + ` ${chalk.cyan(response.data[count].def[def_count].sseq[sseq_count][0][1].dt[0][1])} `);
							//if command asks for synonyms
							if(argv.s){
								let syn_arr = [];
								for(let syn_word=0;syn_word<response.data[count].def[def_count].sseq[sseq_count][0][1].syn_list[0].length;syn_word++){
									syn_arr[syn_word] = response.data[count].def[def_count].sseq[sseq_count][0][1].syn_list[0][syn_word].wd;
								}
								console.log(chalk.bold.red('Synonyms : ') + `${chalk.red(syn_arr.join(", "))}` )
							}
							for(let eg=0;eg<response.data[count].def[def_count].sseq[sseq_count][0][1].dt[1][1].length;eg++){
								console.log(chalk.bold.yellow('eg-> ')  + `${chalk.green(response.data[count].def[def_count].sseq[sseq_count][0][1].dt[1][1][eg].t)} \n`.replace(/ *\{[^}]*\} */g, " ").trim());
							}
						}
						
					}
				}
			}
			
 //[0].def[0].sseq[1][0][1].dt[1][1][0].t
			//console.log(response.data[0].def[0].sseq[1][0][1].syn_list[0][0].wd);
		}
	}).catch((error) => {
		console.log(error);
	});
	
	//audio option
	// shortdef option
	//synonym option
	//-w for word, -s for synonym or similar words, -p for pronounciation.
