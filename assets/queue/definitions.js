const structure = require('./definitions.json');

console.log('bindings:')
console.log(structure.bindings.length);
structure.bindings.forEach(binding => {
    console.log(binding.routing_key);
});

console.log('queues:')
console.log(structure.queues.length);
structure.queues.forEach(queue => {
    console.log(queue.name);
})