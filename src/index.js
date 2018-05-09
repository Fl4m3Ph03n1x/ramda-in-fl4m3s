const { isEmpty, pipe, all, equals, isNil, assoc, curry, is, prop, dissoc, last, append, reduce, map, identity, allPass, filter, complement } = require("ramda");

const notEmpty = complement( isEmpty );

const allTrue = all( equals( true ) );

const notNil = complement( isNil );

const isFunction = is( Function );

const assocTrans = curry(
    ( prop, transformation, object ) => assoc( prop, transformation( object ), object )
);

const renameProp = curry(
    ( oldPropName, newPropName, object ) => pipe(
        assocTrans( newPropName, prop(oldPropName) ),
        dissoc( oldPropName )
    )( object )
);

const mapToSequentialPromises = curry(
    ( transformationFn, dataArray ) =>
        reduce(
            ( array, currData ) => {

                const next = isEmpty( array )                               ?
                    Promise.resolve( transformationFn( currData ) )                            :
                    last(array).then( () => transformationFn( currData ) );

                return append( next, array );
            },
            [ ],
            dataArray
        )
);

const waitAll = requests => Promise.all( requests );

const applyAsyncFn = asyncFn => pipe(
    map( asyncFn ),
    waitAll
);

const compact = filter(
    allPass([identity, notEmpty])
);

module.exports = Object.freeze( {
    notEmpty,
    allTrue,
    notNil,
    assocTrans,
    isFunction,
    renameProp,
    mapToSequentialPromises,
    waitAll,
    applyAsyncFn,
    compact
} );