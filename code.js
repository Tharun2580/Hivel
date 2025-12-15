const fs=require("fs")

const filename = process.argv[2];
 if(!filename) {
    console.error("providefile name in the argument");
    process.exit(1);
}

const data=JSON.parse(fs.readFileSync(filename,"utf8"));
const k=data.keys.k;

function decode(b,v) {
    return BigInt(parseInt(v,b));
}

let p=[];
for (let key of Object.keys(data)) {
    if (key!=="keys" && p.length <k) {
        const x=BigInt(key);
        const b=parseInt(data[key].base);
        const v=data[key].value;
        const y=decode(b,v);
        p.push({x,y});
    }
}

function findc(p) {
    let c=0n;

    for (let i=0;i<p.length;i++) {
        let xi=p[i].x;
        let yi=p[i].y;
        let n=1n;
        let d=1n;
        
        for (let j=0;j<p.length;j++) {
            if (i!==j) {
                let xj=p[j].x;
                n*= -xj;
                d*= (xi - xj);
            }
    }
    c+=(yi*n)/d;
}
return c;
}

const ans=findc(p);
console.log(ans.toString());
