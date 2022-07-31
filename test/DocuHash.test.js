//artifacts.require method provides a way to import the contract artifacts from the build directory. The method takes the name of the contract as an argument and returns the contract abstraction. The contract abstraction is a JavaScript object that provides a number of useful functions for interacting with the contract.
const Documents = artifacts.require("Documents");

const testDoc1 = "testDocument1";
const testDoc1Hash = "0x6550e5e1486f087856ca7d646c17f74d91df14641f34733ae4f12941d7fc89c2";

const testDoc2 = "testDocument2";
const testDoc2Hash = "0x188f602a8d2376ff4ef98aff1c12b82cf7db39a8d9ac2ed2a200f91329a870cb";

contract("Documents test", (accounts) => {
    it("should submit document hash", async () => {
      let instance = await Documents.deployed();
      await instance.addDocument(testDoc1Hash, { from: accounts[0] });
      let result = await instance.documents.call(testDoc1Hash);
      assert.equal(result.hash, testDoc1Hash);
      assert.equal(result.exists, true);
    });
  
    it("should not overwrite document hash", async () => {
      try {
        let instance = await Documents.deployed();
        await instance.addDocument(testDoc1Hash, { from: accounts[0] });
        assert.fail("The transaction should have thrown an error");
      }
      catch (err) {
        assert.include(err.message, "revert", "The error message should contain 'revert'");
      }
    });
  });
  
  contract("Documents test (multiple submitters)", (accounts) => {
    it("should submit multiple different document hash", async () => {
      let instance = await Documents.deployed();
      await instance.addDocument(testDoc1Hash, { from: accounts[0] });
      await instance.addDocument(testDoc2Hash, { from: accounts[1] });
      let result1 = await instance.documents.call(testDoc1Hash);
      let result2 = await instance.documents.call(testDoc2Hash);
      assert.equal(result1.hash, testDoc1Hash);
      assert.equal(result1.exists, true);
      assert.equal(result1.owner, accounts[0]);
      assert.equal(result2.hash, testDoc2Hash);
      assert.equal(result2.exists, true);
      assert.equal(result2.owner, accounts[1]);
    });
  });