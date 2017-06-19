"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.damage = damage;

// variables
var damagePoints = 0;
var leftLettersCount, magicSpell;

// declaration of constant data
// syllables and points for syllables
var syllableFe = "fe",
    syllableAi = "ai",
    syllableJee = "jee",
    syllableJe = "je",
    syllableAin = "ain",
    syllableDai = "dai",
    syllableNe = "ne",
    FeDamage = 1,
    AiDamage = 2,
    JeeDamage = 3,
    JeDamage = 2,
    AinDamage = 3,
    DaiDamage = 5,
    NeDamage = 2;

// damage function taking "spellString" and returning damage points
function damage(spellString) {
  // assigning "spellString" from function argument to variable
  spellString = spellString;
  console.log("SpellString is: " + spellString);

  // check if "fe" syllable not exist, if exist continue executing to next if
  if (checkIfSyllableExist(syllableFe, spellString) != 1) {
    // because there is no "fe" stop executing and return damagePoints
    alert("Syllabe 'fe' doesn't exist ! Damage is 0");
    console.log("Current damage is: " + damagePoints);

    return damagePoints;
  }

  // check if "fe" occurs once, if once continue executing to next if
  if (checkIfFeOnce(spellString) != 1) {
    // because "fe" occurs more than once, stop executing and return damagePoints
    alert("There is more then one 'fe' you tricky wizard!");
    console.log("Current damage is: " + damagePoints);

    return damagePoints;
  }

  // chce if "ai" exist, if not stop executing, is yes continue executing to next if
  if (checkIfSyllableExist(syllableAi, spellString) != 1) {
    // because there is no "ai" stop executing and return damagePoints
    alert("There is no 'ai' syllable you weak wizard!");
    console.log("Current damage is: " + damagePoints);

    return damagePoints;
  }

  // if "ai" is before "fe" stop executing and return damagePoints,
  // if "ai" is after "fe" continue executing functions inside if
  if (isAiBeforeFe(spellString) != 1) {
    // cut spellString to magicSpell which are letters between "fe" and last "ai"
    // i.e : spellString = fexxxxxxxxxxai, magicSpell = xxxxxxxxxx
    sliceToMagicSpell(spellString);

    // count how many matched syllables is in magicSpell and increase damage Points
    howMany(syllableDai, DaiDamage);
    howMany(syllableAi, AiDamage);
    howMany(syllableJee, JeeDamage);
    howMany(syllableJe, JeDamage);
    howMany(syllableAin, AinDamage);
    howMany(syllableNe, NeDamage);

    // count how many letters left after all matched syllables were removed
    leftLettersCount = howManyLettersLeft();

    // count the final damage
    damagePoints = damageCounter(leftLettersCount);
    return damagePoints;
  }
  alert("There is 'ai' before 'fe'!");
  console.log("Current damage is: " + damagePoints);
  return damagePoints;
}

// function checking if syllable passed as an argument exist in spellString
function checkIfSyllableExist(syllable, spellString) {
  // if passed syllable exist return 1
  if (spellString.indexOf(syllable) !== -1) {
    console.log("There is: '" + syllable + "' syllable.");
    return 1;
  }
  // if passed syllable do not exist return 0
  console.log("There is no: '" + syllable + "' syllable.");
  return 0;
}

// function checking if "fe" syllable occurs once in spellString
function checkIfFeOnce(spellString) {
  // match method is looking for matches of "fe" in spellString
  var matchCount = (spellString.match(new RegExp(syllableFe, "g")) || []).length;

  // if matchCount is more than 1 return 0 if not return 1
  if (matchCount > 1) {
    console.log("There is more than one 'fe'");
    return 0;
  }
  console.log("Ther is one 'fe'");
  return 1;
}

// check if "ai" syllable is before "fe" syllable
function isAiBeforeFe(spellString) {
  // if "ai" is before "fe" return 1
  if (spellString.indexOf(syllableAi) < spellString.indexOf(syllableFe)) {
    console.log("There is 'ai' before 'fe' ");
    return 1;
  }
  // "ai" is after "fe", return 0
  console.log("There is 'ai' after 'fe'");
  return 0;
}

// slice all letters between "fe" and last "ai" and put them to
// variable magicSpell
function sliceToMagicSpell(spellString) {
  // magicSpell includes all letters between "fe" and last "ai"
  magicSpell = spellString.slice(spellString.indexOf(syllableFe) + 2, spellString.lastIndexOf(syllableAi));
  console.log("magicSpell is: " + magicSpell);

  // add 1 point to damagePoints variable because of "fe" and 2 points because of "ai"
  damagePoints = damagePoints + 1 + 2;
  console.log("Current damagePoints is: " + damagePoints);
}

function howMany(syllable, syllableDamage) {
  // syllable counter
  var counter = (magicSpell.match(new RegExp(syllable, "g")) || []).length;
  console.log("Syllable '" + syllable + "' occurs: " + counter + " times.");

  // add (syllableDamage * counter) to damagePoints
  // i.e.  damagePoints = 3, counter = 2, syllableDamage = 2, --> 3 + (2 * 2)
  damagePoints = damagePoints + counter * syllableDamage;
  console.log("Current damagePoints is: " + damagePoints);

  // remove all current syllables from magicSpell
  magicSpell = magicSpell.replace(new RegExp(syllable, "g"), "");
  console.log("magicSpell is: " + magicSpell);
}

// check how many letters left in magicSpell
function howManyLettersLeft() {
  // left letteres counter
  leftLettersCount = magicSpell.length;

  // return how many letters left
  console.log("There is: " + leftLettersCount + " letters left.");
  return leftLettersCount;
}

// count the final damagePoints by subtracting leftLettersCount
function damageCounter(leftLettersCount) {
  // subtract left letteres from current damagePoints
  damagePoints = damagePoints - leftLettersCount;

  // if damagePoints is smaller than 0, assign damagePoints = 0
  if (damagePoints < 0) {
    damagePoints = 0;
  }

  // return final damagePoints value
  console.log("Current damage is: " + damagePoints);
  return damagePoints;
}
