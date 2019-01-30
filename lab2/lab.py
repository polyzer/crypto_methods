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

gamma1 = 31
gamma2 = 17
gamma = gamma1*gamma2
n = random.getrandbits(16)
r = random.getrandbits(6)*gamma2
q = random.getrandbits(16)
U = random.getrandbits(16)
t = (r-1)*(q-1)/gamma

print("gamma1: %i\ngamma2: %i\ngamma: %i\nr: %i\nq: %i\nU: %i\nt: %i " %(gamma1, gamma2, gamma, r, q, U, t))
#generating Beta
Beta = random.getrandbits(8)
while gcd(Beta, n) != 1:
    Beta = random.getrandbits(8)
print("Beta %i" %Beta)
#generating z
z = pow(Beta, t) % n
print("z: %i" %z)

while gcd(z, n) != 1:
    Beta = random.getrandbits(8)
    while gcd(Beta, n) != 1:
        Beta = random.getrandbits(8)
    print("Beta: %i" %Beta)
    z = Beta**t % n
    print("z: %i" %z)
#generating alpha
alpha = z
print("alpha: %i" %alpha)

hashi = hashlib.md5()
hashi.update(b"hash")
arr = []
for i in hashi.hexdigest():
	arr.append(str(ord(i)))
H = int("".join(arr))
print("H: %i" %H)

Z = H*(alpha**U)%n
print("Z: %i" %Z)

k = (U - Z) % gamma
print("k: %i" %k)

g = (U/(U-Z)) % gamma
print("g: %i" %g)

#S
S = (alpha**g) % n
#R
R = (alpha**k) % n
#test ratio:
#-power:
power = ((H % n)*(S**k) % n) + k
print("power: %i" %power)
TR_left = S**k % n

TR_right = alpha ** power % n

if TR_left == TR_right:
	print("Test Ratio is rightly")
else:
	print("Test Ratio is rightly")
	print("TR_left: %i\n, TR_right: %i\n" %(TR_left, TR_right))