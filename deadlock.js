const resourceA = { name: "Resource A", locked: false };
const resourceB = { name: "Resource B", locked: false };

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function acquireResource(resource) {
    while (resource.locked) {
        await delay(10); 
    }
    resource.locked = true;
    console.log(`${resource.name} kilitlendi.`);
}

async function task1() {
    await acquireResource(resourceA); 
    await delay(100); 
    console.log("T1: Resource B bekleniyor.");
    await acquireResource(resourceB); // deadlock burada oluşur
    
    console.log("T1 tamamlandı.");
    resourceB.locked = false;
    resourceA.locked = false;
}

async function task2() {
    await acquireResource(resourceB);
    await delay(100);
    console.log("T2: Resource A bekleniyor.");
    await acquireResource(resourceA); // deadlock burada oluşur
    
    console.log("T2 tamamlandı.");
    resourceA.locked = false;
    resourceB.locked = false;
}

Promise.all([task1(), task2()]);

/* 
Bu durum nasıl çözülür?
Lock ordering yaparak.

// T2: artık önce B'yi değil, T1 gibi önce A'yı istiyor.
async function task2() {
    await acquireResource(resourceA); 
    await delay(100);
    
    console.log("T2: Resource B bekleniyor.");
    await acquireResource(resourceB); 
    
    console.log("T2 tamamlandı.");
    resourceB.locked = false;
    resourceA.locked = false;
}
    
*/