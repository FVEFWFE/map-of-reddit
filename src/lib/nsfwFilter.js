// NSFW subreddit filter
// This file contains logic to identify NSFW subreddits based on name patterns

const NSFW_KEYWORDS = [
  'nsfw', 'gonewild', 'porn', 'xxx', 'sex', 'sexy', 'nude', 'nudes',
  'boobs', 'tits', 'ass', 'pussy', 'cock', 'dick', 'penis', 'vagina',
  'hentai', 'rule34', 'yiff', 'furry', 'fetish', 'kink', 'bdsm',
  'milf', 'gilf', 'teen', 'amateur', 'cum', 'cumshot', 'creampie',
  'anal', 'blowjob', 'lesbian', 'gay', 'bi', 'trans', 'shemale',
  'erotic', 'bikini', 'thong', 'lingerie', 'panties', 'bra',
  'naked', 'nsfw_gifs', 'realgirls', 'celebs', 'jerk', 'tribute',
  'slutty', 'whore', 'bitch', 'breeding', 'hotwife', 'cuckold',
  'swingers', 'dogging', 'exhibitionist', 'voyeur', 'upskirt',
  'downblouse', 'cleavage', 'sideboob', 'underboob', 'pokies',
  'cameltoe', 'wedgie', 'yoga pants', 'leggings', 'stockings',
  'fishnets', 'heels', 'feet', 'legs', 'curvy', 'thick', 'pawg',
  'bbw', 'chubby', 'petite', 'tiny', 'legal', 'jailbait',
  'rape', 'forced', 'struggle', 'domination', 'submission', 'slave',
  'master', 'daddy', 'mommy', 'incest', 'sister', 'brother',
  'squirt', 'orgasm', 'masturbation', 'dildo', 'vibrator', 'plug',
  'bondage', 'rope', 'tied', 'gagged', 'spanking', 'whipping',
  'pegging', 'fisting', 'dp', 'gangbang', 'orgy', 'threesome',
  'sounding', 'cbt', 'ballbusting', 'castration', 'vore',
  'inflation', 'expansion', 'lactation', 'pregnancy', 'pregnant',
  'futa', 'futanari', 'trap', 'femboy', 'crossdress', 'sissy',
  'cuckquean', 'hotwife', 'wife sharing', 'swinger', 'polyamory',
  'ladyboy', 'tgirl', 'cd', 'sissy', 'feminization',
  // Body parts and slang
  'booty', 'butt', 'thighs', 'abs', 'muscles', 'jacked',
  // Common NSFW subreddit patterns
  'wild', 'real', 'amateur', 'self', 'verification',
  // Geographic + NSFW patterns (e.g., NYCgonewild, CaliforniaNSFW)
  // These are handled by the pattern matching below
];

const NSFW_PATTERNS = [
  /gonewild/i,
  /nsfw/i,
  /porn/i,
  /xxx/i,
  /\bsex/i,
  /nude/i,
  /naked/i,
  /hentai/i,
  /rule34/i,
  /lewd/i,
  /slutty/i,
  /breeding/i,
  /cum/i,
  /dick/i,
  /cock/i,
  /pussy/i,
  /\bass\b/i,
  /tits/i,
  /boobs/i,
  /anal/i,
  /bdsm/i,
  /fetish/i,
  /kinky/i,
  /erotic/i,
  /milf/i,
  /gilf/i,
  /amateur/i,
  /real.*girls/i,
  /jerk.*off/i,
  /tribute/i,
  /hotwife/i,
  /cuckold/i,
  /swingers/i,
  /lesbian/i,
  /gay.*porn/i,
  /trans.*porn/i,
  /r4r/i, // Reddit for Reddit (often dating/hookup)
  /dirty/i,
  /fap/i,
  /schlick/i,
  /masturbat/i,
  /orgasm/i,
  /climax/i,
  /squirt/i,
  /cream/i,
  /thick/i,
  /curvy/i,
  /petite.*gone/i,
  /college.*sluts/i,
  /verification/i,
];

/**
 * Determines if a subreddit name suggests NSFW content
 * @param {string} subredditName - The name of the subreddit
 * @returns {boolean} - True if the subreddit appears to be NSFW
 */
export function isNSFW(subredditName) {
  if (!subredditName) return false;

  const nameLower = subredditName.toLowerCase();

  // Check against keyword list
  for (const keyword of NSFW_KEYWORDS) {
    if (nameLower.includes(keyword)) {
      return true;
    }
  }

  // Check against pattern list
  for (const pattern of NSFW_PATTERNS) {
    if (pattern.test(subredditName)) {
      return true;
    }
  }

  return false;
}

/**
 * Filters an array of subreddit names to only include NSFW ones
 * @param {string[]} subreddits - Array of subreddit names
 * @returns {string[]} - Filtered array containing only NSFW subreddits
 */
export function filterNSFWOnly(subreddits) {
  return subreddits.filter(isNSFW);
}

/**
 * Creates a Set of NSFW subreddit names for fast lookup
 * @param {string[]} subreddits - Array of all subreddit names
 * @returns {Set<string>} - Set of NSFW subreddit names
 */
export function createNSFWSet(subreddits) {
  return new Set(filterNSFWOnly(subreddits));
}
