const { isEmpty, pipe, all, equals, isNil, assoc, curry, is, prop, dissoc, last, append, reduce, map, identity, allPass, filter, complement } = require("ramda");

/**
 * @function    notEmpty
 * @description
 * Complement of <code>isEmpty</code>. Returns <code>false</code> if the given value is its type's empty value; <code>true</code> otherwise.
 * 
 * @param   {*}         val The value to test.
 * @returns {Boolean}   <code>false</code> if the object is empty, <code>true</code> otherwise.
 * 
 * @see     http://ramdajs.com/docs/#isEmpty
 * 
 * @example
 * notEmpty( [1, 2, 3] );   //=> true
 * notEmpty( [] );          //=> false
 * notEmpty( "" );          //=> false
 * notEmpty( null );        //=> true
 * notEmpty( {} );          //=> false
 * notEmpty( {length: 0} ); //=> true
 */
const notEmpty = complement( isEmpty );

/**
 * @function    notNil
 * @description
 * Complement of <code>isNil</code>. Returns <code>true</code> if the given value is **not** <code>null</code> or <code>undefined</code>, <code>false</code> otherwise.
 * 
 * @param   {*}         val The value to test.
 * @returns {Boolean}   <code>false</code> if the object is <code>null</code> or <code>undefined</code>, <code>false</code> otherwise.
 * 
 * @see     http://ramdajs.com/docs/#isNil
 * 
 * @example
 * notNil( null );          //=> false
 * notNil( undefined );     //=> false
 * notNil( 0 );             //=> true
 * notNil( [] );            //=> true
 */
const notNil = complement( isNil );

/**
 * @function    allEqual
 * @description
 * Composition of <code>all</code> and <code>equals</code>. 
 * Returns <code>true</code> if all the values in the given list are equal to the value to test against.
 * 
 * @param   {*}         val     The value to test equality against.
 * @param   {List}      list    The list we wish to check.
 * @returns {Boolean}   <code>true</code> if all the values in the list equal <code>val</code>, <code>false</code> otherwise.
 * 
 * @see     http://ramdajs.com/docs/#all
 * @see     http://ramdajs.com/docs/#equal
 * 
 * @example
 * allEqual( 1, [1, 1, 1] );              //=> true
 * allEqual( 1, [] );                     //=> true
 * allEqual( true, [true, false, true] ); //=> false
 */
const allEqual = curry(
    ( value, list ) => all( equals( value ), list )
);

/**
 * @function    isFunction
 * @description
 * Returns <code>true</code> of the given value is a Function, <code>false</code> otherwise.
 * 
 * @param   {*}         val The value to test if it is a Function.
 * @returns {Boolean}   <code>true</code> if <code>val</code> is a Function, <code>false</code> otherwise.
 * 
 * @see http://ramdajs.com/docs/#is
 * 
 * @example
 * isFunction( console.log );   //=> true
 * isFunction( 1 );             //=> false
 * isFunction( "" );            //=> false
 * isFunction( [] );            //=> false
 * isFunction( new Map() );     //=> false
 */
const isFunction    =   is( Function );

/**
 * @function    isNumber
 * @description
 * Returns <code>true</code> of the given value is a Number, <code>false</code> otherwise.
 * 
 * @param   {*}         val The value to test if it is a Number.
 * @returns {Boolean}   <code>true</code> if <code>val</code> is a Number, <code>false</code> otherwise.
 * 
 * @see http://ramdajs.com/docs/#is
 * 
 * @example
 * isNumber( console.log ); //=> false
 * isNumber( 1 );           //=> true
 * isNumber( "" );          //=> false
 * isNumber( [] );          //=> false
 * isNumber( new Map() );   //=> false
 */
const isNumber      =   is( Number );

/**
 * @function    isString
 * @description
 * Returns <code>true</code> of the given value is a String, <code>false</code> otherwise.
 * 
 * @param   {*}         val The value to test if it is a String.
 * @returns {Boolean}   <code>true</code> if <code>val</code> is a String, <code>false</code> otherwise.
 * 
 * @see http://ramdajs.com/docs/#is
 * 
 * @example
 * isString( console.log ); //=> false
 * isString( 1 );           //=> false
 * isString( "" );          //=> true
 * isString( [] );          //=> false
 * isString( new Map() );   //=> false
 */
const isString      =   is( String );

/**
 * @function    isArray
 * @description
 * Returns <code>true</code> of the given value is an Array, <code>false</code> otherwise.
 * 
 * @param   {*}         val The value to test if it is an Array.
 * @returns {Boolean}   <code>true</code> if <code>val</code> is an Array, <code>false</code> otherwise.
 * 
 * @see http://ramdajs.com/docs/#is
 * 
 * @example
 * isArray( console.log ); //=> false
 * isArray( 1 );           //=> false
 * isArray( "" );          //=> false
 * isArray( [] );          //=> true
 * isArray( new Map() );   //=> false
 */
const isArray       =   is( Array );

/**
 * @function    isMap
 * @description
 * Returns <code>true</code> of the given value is a Map, <code>false</code> otherwise.
 * 
 * @param   {*}         val The value to test if it is a Map.
 * @returns {Boolean}   <code>true</code> if <code>val</code> is a Map, <code>false</code> otherwise.
 * 
 * @see http://ramdajs.com/docs/#is
 * 
 * @example
 * isMap( console.log ); //=> false
 * isMap( 1 );           //=> false
 * isMap( "" );          //=> false
 * isMap( [] );          //=> false
 * isMap( new Map() );   //=> true
 */
const isMap         =   is( Map );

/**
 * @function    compact
 * @description
 * Returns a copy of the array with all falsy and empty values removed.
 * 
 * @param   {List}  list    The list to compact.
 * @returns {List}  The new compacted list.
 * 
 * @example
 * compact( [0, 1, false, 2, '', 3, [], {}] );  //=> [1, 2, 3]
 */
const compact = filter(
    allPass([identity, notEmpty])
);

/**
 * @function    assocTrans
 * @description
 * Makes a shallow clone of the target object, setting or overriding the specified property with the result of the given function over the target object. 
 * Note that this copies and flattens prototype properties onto the new object as well. All non-primitive properties are copied by reference.
 * 
 * @param   {String}    prop            The property name to set.  
 * @param   {Function}  fn              The transformation function to apply to <code>obj</code>. The result of the evaluation of this function will be the value of <code>prop</code>.
 * @param   {Object}    obj             The object to clone.
 * @returns {Object}    A new object equivalent to <code>obj</code> but with <code>prop</code> changed to have the result of <code>fn</code> as a value.
 * 
 * @see     http://ramdajs.com/docs/#assoc
 * 
 * @example
 * const getMean = pipe( prop( "earnings" ), mean );
 * assocTrans( "mean", getMean, { earnings: [1, 2, 3], trimester: 1 } );    //=> { earnings: [1, 2, 3], trimester: 1, mean: 2 };
 */
const assocTrans = curry(
    ( prop, transformation, object ) => assoc( prop, transformation( object ), object )
);

/**
 * @function    renameProp
 * @description
 * Makes a shallow clone of the target object, renaming the given property.
 * Note that this copies and flattens prototype properties onto the new object as well. All non-primitive properties are copied by reference.
 * 
 * @param   {String}    oldPropName The property to be renamed.  
 * @param   {String}    newPropName The new name of the property.
 * @param   {Object}    obj         The object to clone.
 * @returns {Object}    A new object equivalent to <code>obj</code> but with the given property renamed.
 * 
 * @example
 * renameProp( "tree", "plant", { tree: "sunflower" } );    //=> { plant: "sunflower" };
 */
const renameProp = curry(
    ( oldPropName, newPropName, object ) => pipe(
        assocTrans( newPropName, prop(oldPropName) ),
        dissoc( oldPropName )
    )( object )
);

/**
 * @function    mapToSequentialPromises
 * @description
 * Applies <code>fn</code> sequentially to each element of <code>list</code>. 
 * If <code>fn</code> is async and returns a Promise, then each Promise will be executed only when the previous Promise has resolved.
 * If <code>fn</code> does not return a Promise, then its result is lifted into one.
 * 
 * @param   {Function}  fn      The function to apply to each element of <code>list</code>.
 * @param   {List}      list    The list to be iterated over sequentially.
 * @returns {List}      A list of Promises with the results of applying <code>fn</code> to <code>list</code>.
 * 
 * @example
 * const waitAndPrint = delay( 1000, console.log );
 * mapToSequentialPromises( waitAndPrint, [1, 2, 3] );                              //=> 1, 2, 3 ( each with 1000ms of delay between )
 */
const mapToSequentialPromises = curry(
    ( transformationFn, dataArray ) =>
        reduce(
            ( array, currData ) => {

                const next = isEmpty( array )                           ?
                    Promise.resolve( transformationFn( currData ) )     :
                    last(array).then( () => transformationFn( currData ) );

                return append( next, array );
            },
            [ ],
            dataArray
        )
);

/**
 * @function    mapAsyncFn
 * @description
 * Applies <code>fn</code> concurrently to each element of <code>list</code>. 
 * Unlike <code>mapToSequentialPromises</code> the execution of Promise N+1 will not wait for the resolution of Promise N. 
 * Finishes once all the Promises are done via use of Promise.all. 
 * 
 * @param       {Function}  fn      The function to apply to each element of <code>list</code>.
 * @param       {List}      list    The list to be iterated over concurrently.
 * @returns     {Promise}   A promise containing the new list.
 * 
 * @example
 * const double = x => x * 2;
 * const waitAndDouble = delay( 1000, double );
 * mapAsyncFn( waitAndDouble, [1, 2, 3] ).then( console.log );               //=> 2, 4, 6 ( all at the same time, 1 second after `mapAsyncFn` is executed )  
 */
const mapAsyncFn = curry(
    ( asyncFn, list ) => Promise.all( map( asyncFn, list ) )
);

/**
 * @function    seedlessReduce
 * @description
 * Reduce transformation using the head of the given list as initial input. 
 * 
 * @param   {Function}  fn      The reduce function.
 * @param   {List}      list    List of values to reduce.
 * @returns {*}         The result of the iteration function.
 * 
 * @example
 * const add = ( x, y ) => x + y;
 * seedlessReduce( add, [ 1, 2, 3 ] );  //=> returns 6
 */
const seedlessReduce = curry(
    ( fn, list ) => list.reduce( fn )
);

/**
 * @function    promiseAll
 * @description
 * Alias for Promise.all. Receives a list of promises and waits for all of them to complete or for one to reject.
 * Returns a single Promise.
 * 
 * @param   {List}      pList   The list of promises. 
 * @returns {Promise}   A single promise containing the list of results if every promise in <code>pList</code> was fulfilled.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
 * 
 * @example
 * promiseAll( [ Promise.resolve(1), Promise.resolve(2) ] ).then( console.log );    //=> [1, 2]
 */
const promiseAll = pList => Promise.all( pList );

/**
 * @function    then
 * @description
 * Executes the given function after <code>promise</code> finishes resolving.
 * 
 * @param   {Function}  fn      The function to execute after <code>promise</code>.
 * @param   {Promise}   promise The promise to run.
 * @returns {Promise}   A promise with the return value of <code>fn</code>. 
 * 
 * @example
 * then( () => console.log("hello"), wait(1000) );      //=> Prints 'hello' after 1 second
 */
const then = curry(
    ( fn, promise ) => promise.then( fn )
);

/**
 * @function    wait
 * @description
 * Equivalent of `setTimeout` but in Promise format. 
 * 
 * @param   {Number}    ms  The amount of milliseconds to wait.
 * @returns {Promise}   An empty promise that always resolves.
 * 
 * @example
 * const sayHello = ( ) => console.log( "hello" );
 * wait( 1000 ).then( sayHello );                   //=> print 'hello' after 1 second
 */
const wait = ms => new Promise( resolve => setTimeout( resolve, ms ) );

/**
 * @function    delay
 * @description 
 * Waits `ms` milliseconds and then executes the given function with the given data.
 * 
 * @param   {Number}    ms      The amount of milliseconds to wait.
 * @param   {Function}  fn      The function to execute after `ms` milliseconds have passed.
 * @param   {*}         data    The data to be passed to `fn` for it to execute.
 * @returns {Promise}   A promise with the execution result of `fn`. 
 *
 * @example
 * const double = x => x * 2;
 * const waitAndDouble = delay( 1000, double );
 * 
 * waitAndDouble( 2 ).then( console.log );      //=> prints 4 after 1 second 
 */
const delay = curry(
    ( ms, fn, data ) => wait( ms ).then( ( ) => fn( data ) )
);

module.exports = Object.freeze( {
    notEmpty,
    allEqual,
    notNil,
    assocTrans,
    isFunction,
    isNumber,
    isMap,
    isString,
    isArray,
    renameProp,
    mapToSequentialPromises,
    promiseAll,
    mapAsyncFn,
    compact,
    seedlessReduce,
    then,
    wait,
    delay
} );