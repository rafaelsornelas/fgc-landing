const PocketBaseModule = require('pocketbase');
const PocketBase = PocketBaseModule.default || PocketBaseModule;

const pb = new PocketBase('https://admin.fgcexpertise.com.br');

async function main() {
    try {
        const collection = await pb.collections.getOne('diagnosticos');
        console.log('=== SCHEMA ATUAL ===');
        collection.fields.forEach(f => {
            console.log(`  - ${f.name} (${f.type})`);
        });
    } catch (e) {
        console.error('Erro:', e.message || e);
    }
}

main();
