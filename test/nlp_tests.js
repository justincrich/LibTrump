var expect = require('chai').expect;
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
var partsOfSpeech = require('../models/nlp.js').partsOfSpeech;
var swapsies = require('../models/nlp.js').swapsies;

describe('NLP', function(){
  let text;
  let params;
  let pos;
  before(()=>{
    text = {
      good:'Justin loves to code in Javascript in America for Facebook, LDS',
      bad: 'spoon to and far',
      worse: 'asdfasd'
    };
    params = {
      normal:{
        people:'Hillary Clinton',
        places:'Naboo',
        organizations:'Boy Scouts',
        acronyms: 'FBI'
      }
    };
    pos = {
      people:[
        {
          text:'Justin'
        }
      ],
      places:[
        {
          text:'America'
        }
      ],
      organizations:[
        {
          text:'Facebook'
        }
      ],
      acronyms: [
        {
          text:'LDS'
        }
      ]
    }

  });
  describe('partsOfSpeech', function(){
    it('Returns a promise', function(){
      var promise = partsOfSpeech(text.good);
      expect(Promise.prototype.isPrototypeOf(promise)).to.be.true;
    });
    it('Returns values successfully', ()=>{
      return partsOfSpeech(text.good).then((result)=>{
        let keys = Object.keys(result);
        let length = keys.length;
        expect(keys).to.have.lengthOf.above(0);
      });
    });
  });
  describe('swapsies',function(){

    it('Text swapped. New Text: ',()=>{
      return swapsies(text.good,params,pos).then((output)=>{
        expect(output).is.eq("Hillary Clinton loves to code in Javascript in Naboo for Boy Scouts, FBI")
      });
    });

    });
  });
