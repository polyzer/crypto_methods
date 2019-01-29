import random
import hashlib
# A simple Python3 program 
# to calculate Euler's 
# Totient Function 

# Function to return 
# gcd of a and b 
def gcd(a, b): 

	if (a == 0): 
		return b 
	return gcd(b % a, a) 

# A simple method to evaluate 
# Euler Totient Function 
def phi(n): 

	result = 1
	for i in range(2, n): 
		if (gcd(i, n) == 1): 
			result+=1
	return result 

# Driver Code 
# for n in range(1, 11): 
# 	print("phi(",n,") = ", 
# 		phi(n), sep = "") 
			
# This code is contributed 
# by Smitha 

hashi = hashlib.sha256()
hashi.update(b"hash")

gamma1 = 31
gamma2 = 17
gamma = gamma1*gamma2
n = random.getrandbits(16)
r = random.getrandbits(6)*gamma2
q = random.getrandbits(16)
U = random.getrandbits(16)
t = (r-1)*(q-1)/gamma

print("gamma1: %i\n gamma2: %i\n gamma: %i\n r: %i\n q: %i\n U: %i\n t: %i " %(gamma1, gamma2, gamma, r, q, U, t))
Beta = random.getrandbits(16)
while gcd(Beta, n) != 1:
    Beta = random.getrandbits(16)
print("Beta %i" %Beta)
print(29**9001)
z = pow(Beta, t) % n

while gcd(z, n) != 1:
    Beta = random.getrandbits(8)
    while gcd(Beta, n) != 1:
        Beta = random.getrandbits(8)
    print("Beta %i", Beta)
    z = Beta**t % n

alpha = z



