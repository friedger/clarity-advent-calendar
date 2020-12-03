(impl-trait 'ST3YPJ6BBCZCMH71TV8BK50YC6QJTWEGCNDFWEQ15.advent-calendar.door-trait)

(define-data-var msg-ok (string-utf8 4000) u"Today is the 3nd of December. You have managed to use the advent-calendar correctly.")
(define-data-var msg-nok (string-ascii 32) "Use advent calendar directly.")

(define-public (open)
    (if (is-eq (print contract-caller) 'ST3YPJ6BBCZCMH71TV8BK50YC6QJTWEGCNDFWEQ15.advent-calendar)
      (ok (print (var-get msg-ok)))
      (err (print (var-get msg-nok)))))
