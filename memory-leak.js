const leakedList = []; 

function createLeak() {
    console.log("Yeni objeler oluşturuluyor.");

    for (let i = 0; i < 1000; i++) {
        let largeData = new Array(1000).fill("Zombi obje"); 

        leakedList.push(largeData); 

        let leakingFunction = function() {
            if (largeData) console.log("Veri hala mevcut"); 
        };
        
        global.lastFunction = leakingFunction; 
    }

    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024; 
    console.log(`Mevcut Heap Kullanımı: ${Math.round(memoryUsage)} MB`);
}

setInterval(createLeak, 1000);

