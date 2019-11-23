# word-fetch
command line dictionary tool, gives lists the meaning along with example use cases.

# Usage
$define -w <your_word> 
$define -w <your_word> -s  ==> if you want to list the synonyms too.

# dependencies
1) Axios --> $npm install axios
2) Chalk --> $npm install chalk
3) Yargs --> $npm install yargs
4) Boxen --> $npm install boxen

# Running the script
to run, execute the following command <b>once</b> in the cloned repository
$npm install -g .
then on, to get the definition, run:
$define -w <your_word>
$define -w <your_word> -s for definition with synonyms.
