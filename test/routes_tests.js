let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let expect = chai.expect;
let should = chai.should();
chai.use(chaiHttp);

describe('ROUTES',function(){
  var params;
  before(()=>{
    params = {
      normal:{
        people:'Hillary Clinton',
        place:'Naboo',
        organizations:'Boy Scouts',
        acronym: 'FBI'
      },
      missing:{
        place:'Naboo',
        organizations:'Boy Scouts',
        acronym: 'FBI'
      }
    }
  });
  describe('GET /TWEET/:totTweets',function(){
    let num;
    before(()=>{
      num = 1;
    });
    it('responds with status 200',function(done){
      chai.request(app)
        .get('/tweet/'+num)
        .end(function(err,res){
          expect(res).to.have.status(200);
          done();
        });
    });
    it(`Returns 1 Tweet`,function(done){
      chai.request(app)
        .get('/tweet/'+num)
        .end(function(err,res){
          console.log('length', res.body.length);
          expect(res.body.length).to.eql(1);
          done();
        });
    });
    it('Has POS Data',function(done){
      chai.request(app)
        .get('/tweet/'+num)
        .end(function(err,res){
          let pos = res.body[0].pos;
          let length=0;
          for(key in pos){
            length += pos[key].length;
          }
          expect(length).gt(0);
          done();
        });
    });
  });


  xdescribe('GET /Tweet',function(done){
    it('Returns 10 Tweets By Default',function(done){
      chai.request(app)
        .get('/tweet')
        .end(function(err,res){
          expect(res.body).to.have.length(10);
          done();
        });
    });
  });

  xdescribe('GET /Tweet/:id',function(){
    it('Get Tweet By ID',function(){

    });
  });
  xdescribe('POST /fauxtweet/',function(){
    let url;
    before(()=>{
      url='/fauxtweet'
    });
    it('Request sent correctly',function(done){
      chai.request(app)
        .post(url)
        .send(params.normal)
        .end(function(err,res){
          res.should.have.status(200);
          res.body.should.be.a('array');
          var length = res.body.length;
          length.should.be.gt(0);
          done();
        });
    });
    it('Not missing Parameters',function(done){
      chai.request(app)
        .post(url)
        .send(params.missing)
        .end(function(err,res){

          res.should.have.status(400);//bad request
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.a('object');
          res.body.error.should.have.property('message');
          res.body.error.message.should.eql('Missing Form Input');
          done();
        });
    });
  });
});
