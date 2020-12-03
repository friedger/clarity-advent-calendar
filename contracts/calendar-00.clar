(impl-trait 'ST3YPJ6BBCZCMH71TV8BK50YC6QJTWEGCNDFWEQ15.advent-calendar.door-trait)

(define-data-var msg (string-utf8 4000) u"\u{1F384} Welcome to the Clarity Advent Calendar! This is a decentralized calendar. Each day a new contract is added to the calendar. The contract implements an 'open' function that is called by the advent calendar.")
(define-read-only (open)
 (ok (print (var-get msg))))
