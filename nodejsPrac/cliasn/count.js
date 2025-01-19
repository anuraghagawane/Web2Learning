const {Command} = require("commander");
const fs = require("fs");

const program = new Command();

function countWord(data){
	return data.replace("\n", " ").split(" ").length;
}

program.name("count")
	.description("count the file's characters")
	.version("0.8.0");

program.command('count')
	.description('count character in file')
	.argument('<file>', 'file name')
	.action((file) => {
		fs.readFile(file, "utf8", (err, data)=> {
			if(err){
				console.log(err);
			}
			else{
				console.log(countWord(data)+1);		
			}
		});
	});

program.parse();
		
