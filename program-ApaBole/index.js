function isApaBole(num) {
    if(num%3==0 && num%5==0){
        return 'ApaBole'
    }else if (num%3==0) {
        return 'Apa'
    } else if (num%5==0) {
        return 'Bole'
    } else {
        return num
    }
}

function main() {
    let str = ''
    for (let index = 1; index <= 100; index++){
        str += isApaBole(index) + ' '
    }    
    console.log(str)
}

main()