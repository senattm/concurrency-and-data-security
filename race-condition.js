let counter = 0;
const threads = 8;
const perThread = 200000;

async function incrementCounter() {
    for (let i = 0; i < perThread; i++) {
        let temp = counter; 
        await Promise.resolve(); 
        counter = temp + 1; 
    }
}

async function main() {
    console.log("İşlem başlatıldı.");
    
    const tasks = [];
    for (let i = 0; i < threads; i++) {
        tasks.push(incrementCounter());
    }

    await Promise.all(tasks);

    console.log(`Beklenen: ${threads * perThread}`);
    console.log(`Gerçek:   ${counter}`);
}

main();

/* 
Bu durum nasıl çözülür?
Kilit kullanarak.

let lock = false;

async function incrementCounter() {
    for (let i = 0; i < perThread; i++) {
        while (lock) {
            await new Promise(resolve => setTimeout(resolve, 0));
        }
        
        lock = true; 
        try {
            let temp = counter;
            await Promise.resolve(); 
            counter = temp + 1;
        } finally {
            lock = false; 
        }
    }
}
    
*/